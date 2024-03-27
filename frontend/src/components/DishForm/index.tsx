import { AddNewIngredient } from "../AddNewIngredient";
import { Button } from "../Button";
import { FileUploadButton } from "../FileUploadButton";
import { FormGroup } from "../FormGroup";
import { NewIngredient } from "../NewIngredient";
import { Input } from "../Input";
import { Label } from "../Label";
import { TextArea } from "../TextArea";
import { Select } from "../Select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChangeEvent, useEffect, useState } from "react";
import { Ingredient } from "@/types/dish";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const addDishSchema = z.object({
  image: z
    .any()
    .refine((value) => value !== null && value !== undefined, {
      message: "O valor não pode ser nulo",
    })
    .refine(
      (value) => !value || value instanceof File || value instanceof Blob,
      {
        message: "O valor deve ser um File ou Blob",
      }
    )
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "O arquivo deve ter no máximo 5MB",
    })
    .refine((file) => !file || file.type.startsWith("image/"), {
      message: "O arquivo deve ser do tipo imagem",
    }),
  name: z.string().min(1, "Insira um nome."),
  category: z.string().min(1, "Selecione uma categoria."),
  ingredients: z
    .array(z.string().min(1, "Insira algum ingrediente"))
    .refine((data) => data.length > 0, {
      message: "Insira pelo menos um ingrediente",
    }),
  price: z.string().refine(
    (val) => {
      const parsed = parseFloat(val);
      return !isNaN(parsed) && parsed > 0;
    },
    {
      message: "Insira um preço válido e positivo.",
    }
  ),
  description: z.string().min(1, "Insira uma descrição."),
});

const editDishSchema = z.object({
  image: z
    .any()
    .optional()
    .refine(
      (value) =>
        value === undefined ||
        value === null ||
        value instanceof File ||
        value instanceof Blob,
      {
        message: "O valor deve ser um File ou Blob",
      }
    )
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "O arquivo deve ter no máximo 5MB",
    })
    .refine((file) => !file || file.type.startsWith("image/"), {
      message: "O arquivo deve ser do tipo imagem",
    }),
  name: z.string().min(1, "Insira um nome."),
  category: z.string().min(1, "Selecione uma categoria."),
  ingredients: z
    .array(z.string().min(1, "Insira algum ingrediente"))
    .refine((data) => data.length > 0, {
      message: "Insira pelo menos um ingrediente",
    }),
  price: z.string().refine(
    (val) => {
      const parsed = parseFloat(val);
      return !isNaN(parsed) && parsed > 0;
    },
    {
      message: "Insira um preço válido e positivo.",
    }
  ),
  description: z.string().min(1, "Insira uma descrição."),
});

type dishSchemaProps = z.infer<typeof addDishSchema>;

interface DishFormProps {
  isEdit?: boolean;
  initialValues?: any;
  onSubmit: (values: dishSchemaProps) => void;
}

export function DishForm({
  isEdit = false,
  initialValues,
  onSubmit,
}: DishFormProps) {
  const [categoryName, setCategoryName] = useState("");
  const [ingredientList, setIngredientList] = useState<string[]>([]);
  const dishSchema = isEdit ? editDishSchema : addDishSchema;
  const { image, ...initialValuesWithoutImage } = initialValues ?? {};

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<dishSchemaProps>({
    resolver: zodResolver(dishSchema),
    defaultValues: initialValuesWithoutImage,
    mode: "onBlur",
  });

  function handleSelectCategory(name: string) {
    setCategoryName(name);
    setValue("category", name);
  }

  function addIngredientToList(newIngredient: string) {
    if (ingredientList.includes(newIngredient)) {
      return alert("Você já possui esse ingrediente");
    }
    setIngredientList([newIngredient, ...ingredientList]);
  }

  function removeIngredientFromList(ingredientToRemove: string) {
    setIngredientList(
      ingredientList.filter((ingredient) => ingredient !== ingredientToRemove)
    );
  }

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setValue("image", file);
    }
  };

  const handleFormSubmit = (values: dishSchemaProps) => {
    onSubmit(values);
    reset();
    setIngredientList([]);
    setCategoryName("");
  };

  useEffect(() => {
    setValue("ingredients", ingredientList);
  }, [ingredientList]);

  useEffect(() => {
    if (initialValues && initialValues.ingredients) {
      setIngredientList(
        initialValues.ingredients.map(
          (ingredient: Ingredient) => ingredient.name
        )
      );
    }
  }, [initialValues]);

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-6 lg:flex-row">
        <FormGroup className="lg:w-fit">
          <Label title="Imagem do prato" htmlFor="dish-image" />
          <FileUploadButton
            title="Selecione uma imagem"
            onFileChange={onFileChange}
          />
          {errors.image && (
            <p className="text-red-500 text-sm">
              {String(errors.image.message)}
            </p>
          )}
        </FormGroup>

        <FormGroup className="flex-1">
          <Label title="Nome" htmlFor="name" />
          <Input
            id="name"
            placeholder="Ex.: Salada Ceasar"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </FormGroup>

        <FormGroup className="lg:w-[464px]">
          <Label title="Categoria" htmlFor="category" />
          <Select
            {...register("category")}
            handleSelectCategory={handleSelectCategory}
            categoryName={categoryName}
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </FormGroup>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <FormGroup className="flex-1 overflow-auto">
          <Label title="Ingredientes" htmlFor="ingredients" />
          <div className="bg-dark-900 flex items-center gap-3 rounded-lg text-light-500 px-3.5 py-1.5 overflow-x-auto">
            <AddNewIngredient handleNewIngredient={addIngredientToList} />
            {ingredientList.map((ingredient: string) => (
              <NewIngredient
                key={ingredient}
                ingredient={ingredient}
                onDelete={() => removeIngredientFromList(ingredient)}
              />
            ))}
          </div>

          {errors.ingredients && (
            <p className="text-red-500 text-sm">{errors.ingredients.message}</p>
          )}
        </FormGroup>

        <FormGroup className="lg:w-[351px]">
          <Label title="Preço" htmlFor="price" />
          <Input
            id="price"
            type="text"
            placeholder="R$ 00,00"
            {...register("price")}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </FormGroup>
      </div>

      <FormGroup>
        <Label title="Descrição" htmlFor="description" />
        <TextArea
          id="description"
          placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </FormGroup>

      <Button title="Salvar alterações" className="lg:w-[172px] lg:ml-auto" />
    </form>
  );
}
