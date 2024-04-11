import { AddNewIngredient } from "../AddNewIngredient";
import { Button } from "../Button";
import { FileUploadButton } from "../FileUploadButton";
import { FormGroup } from "../FormGroup";
import { NewIngredient } from "../NewIngredient";
import { FormInput } from "../FormInput";
import { Label } from "../Label";
import { TextArea } from "../TextArea";
import { Select } from "../Select";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Dish, Ingredient } from "@/types/dish";
import { useIngredients } from "@/hooks/ingredients";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const BaseDishSchema = z.object({
  name: z
    .string()
    .min(1, "Insira um nome.")
    .refine((value) => value.trim().length > 0, {
      message: "O campo não pode ser vazio.",
    }),
  category: z.string().min(1, "Selecione uma categoria."),
  ingredients: z
    .array(z.string().min(1, "Insira algum ingrediente"))
    .refine((data) => data.length > 0, {
      message: "Insira pelo menos um ingrediente",
    }),
  price: z.coerce
    .number({ invalid_type_error: "Insira um número válido" })
    .min(0.1, "Insira um valor")
    .refine(
      (value) => {
        const stringValue = String(value).trim();
        return stringValue !== "";
      },
      {
        message: "O preço não pode conter apenas espaços em branco",
      }
    ),
  description: z.string().min(1, "Insira uma descrição."),
});

const EditDishSchema = BaseDishSchema.extend({
  image: z
    .instanceof(FileList)
    .refine((files) => {
      if (FileList.length === 0) {
        return true;
      } else {
        const firstFile = files.item(0);
        return firstFile ? firstFile.size <= MAX_FILE_SIZE : false;
      }
    }, `Tamanho máximo de 5MB`)
    .transform((files) => {
      return files.item(0);
    }),
});

const AddDishSchema = BaseDishSchema.extend({
  image: z
    .instanceof(FileList)
    .refine((files) => !!files.item(0), "A imagem de perfil é obrigatória")
    .refine((files) => {
      const firstFile = files.item(0);
      return firstFile ? firstFile.size <= MAX_FILE_SIZE : false;
    }, `Tamanho máximo de 5MB`)
    .transform((files) => {
      return files.item(0);
    }),
});

interface DishFormProps {
  isEdit?: boolean;
  initialValues?: Dish;
  onSubmit: (values: any) => void;
  handleDeleteDish?: () => void;
}

export function DishForm({
  isEdit = false,
  initialValues,
  onSubmit,
  handleDeleteDish,
}: DishFormProps) {
  let dishSchema;
  if (isEdit) {
    dishSchema = EditDishSchema;
  } else {
    dishSchema = AddDishSchema;
  }

  type dishSchemaProps = z.infer<typeof dishSchema>;

  const { ingredientList, updateIngredientList, removeIngredientFromList } =
    useIngredients();
  const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] =
    useState(false);

  const DishForm = useForm<dishSchemaProps>({
    resolver: zodResolver(dishSchema),
    defaultValues: initialValues
      ? {
          ...initialValues,
          image: undefined,
          ingredients: initialValues.ingredients.map(
            (ingredient) => ingredient.name
          ),
        }
      : {},
    mode: "onBlur",
  });

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = DishForm;

  const handleFormSubmit = async (values: dishSchemaProps) => {
    try {
      await onSubmit(values);
      setFormSubmittedSuccessfully(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (formSubmittedSuccessfully && !isEdit) {
      reset();
      updateIngredientList([]);
    }
  }, [formSubmittedSuccessfully]);

  useEffect(() => {
    setValue("ingredients", ingredientList);
  }, [ingredientList]);

  useEffect(() => {
    if (isEdit && initialValues && initialValues.ingredients) {
      updateIngredientList(
        initialValues.ingredients.map(
          (ingredient: Ingredient) => ingredient.name
        )
      );
      return;
    }
    updateIngredientList([]);
  }, []);

  return (
    <FormProvider {...DishForm}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-6 lg:flex-row">
          <FormGroup className="lg:w-fit">
            <Label title="Imagem do prato" htmlFor="dish-image" />
            <FileUploadButton title="Selecione uma imagem" />
            {errors.image && (
              <p className="text-red-500 text-sm">
                {String(errors.image.message)}
              </p>
            )}
          </FormGroup>

          <FormGroup className="flex-1">
            <Label title="Nome" htmlFor="name" />
            <FormInput placeholder="Ex.: Salada Ceasar" name="name" />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </FormGroup>

          <FormGroup className="lg:w-[464px]">
            <Label title="Categoria" htmlFor="category" />
            <Select />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </FormGroup>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <FormGroup className="flex-1 overflow-auto">
            <Label title="Ingredientes" htmlFor="ingredients" />
            <div className="bg-dark-900 flex items-center gap-3 rounded-lg text-light-500 px-3.5 py-1.5 overflow-x-auto">
              <AddNewIngredient />
              {ingredientList.map((ingredient: string) => (
                <NewIngredient
                  key={ingredient}
                  ingredient={ingredient}
                  onDelete={() => removeIngredientFromList(ingredient)}
                />
              ))}
            </div>

            {errors.ingredients && (
              <p className="text-red-500 text-sm">
                {errors.ingredients.message}
              </p>
            )}
          </FormGroup>

          <FormGroup className="lg:w-[351px]">
            <Label title="Preço" htmlFor="price" />
            <FormInput name="price" type="text" placeholder="R$ 00.00" />
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
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </FormGroup>

        <div className="flex gap-5 justify-end">
          {isEdit && (
            <Button
              type="button"
              title="Excluir prato"
              className="lg:w-[172px] bg-light-600 hover:bg-light-500"
              onClick={handleDeleteDish}
            />
          )}
          <Button
            type="submit"
            title="Salvar alterações"
            className="lg:w-[172px]"
          />
        </div>
      </form>
    </FormProvider>
  );
}
