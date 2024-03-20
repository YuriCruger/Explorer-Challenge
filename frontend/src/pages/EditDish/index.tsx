import { Button } from "@/components/Button";
import { FormGroup } from "@/components/FormGroup";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { AddNewIngredient } from "@/components/AddNewIngredient";
import { PageTitle } from "@/components/PageTitle";
import { PreviousPageButton } from "@/components/PreviousPageButton";
import { Select } from "@/components/Select";
import { TextArea } from "@/components/TextArea";
import { AxiosError, api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Ingredient } from "@/components/Ingredient";
import { FileUploadButton } from "@/components/FileUploadButton";
import { useParams } from "react-router-dom";
import { useDish } from "@/hooks/dishes";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const dishSchema = z.object({
  image: z
    .any()
    .refine((files) => files && files[0], "Selecione uma imagem.")
    .refine(
      (files) => files[0]?.size <= MAX_FILE_SIZE,
      "O tamanho máximo da imagem é 5MB."
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      "Apenas os formatos .jpg, .jpeg, .png e .webp são suportados."
    ),
  name: z.string().min(1, "Insira um nome."),
  category: z.string().min(1, "Selecione uma categoria."),
  ingredients: z
    .array(z.string().min(1, "Insira algum ingrediente"))
    .refine((data) => data.length > 0, {
      message: "Insira pelo menos um ingrediente",
    }),
  price: z.string().min(1, "Insira um preço."),
  description: z.string().min(1, "Insira uma descrição."),
});

type dishSchemaProps = z.infer<typeof dishSchema>;

export default function EditDish() {
  const [categoryName, setCategoryName] = useState("");
  const [ingredientList, setIngredientList] = useState<string[]>([]);
  const { dishList } = useDish();
  const { id } = useParams();
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<dishSchemaProps>({
    resolver: zodResolver(dishSchema),
  });

  const dish = dishList?.find((dish) => dish.id === Number(id));

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

  function onSubmit(values: dishSchemaProps) {
    const formData = new FormData();
    if (values.image[0] instanceof File) {
      formData.append("image", values.image[0]);
    }
    formData.append("name", values.name);
    formData.append("category", values.category);
    formData.append("ingredients", values.ingredients.join(","));
    formData.append("price", values.price);
    formData.append("description", values.description);

    api
      .post("/dishes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Formulário enviado com sucesso");
        reset();
      })
      .catch((error) => {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          alert(axiosError.response.data.message);
        }
      });
  }

  useEffect(() => {
    if (dish) {
      setCategoryName(dish.category);
      setIngredientList(dish.ingredients.map((ingredient) => ingredient.name));
    }
  }, [dish]);

  useEffect(() => {
    setValue("ingredients", ingredientList);
  }, [ingredientList]);

  return (
    <div className="px-7 pt-3 pb-12 space-y-6 xl:px-32">
      <PreviousPageButton />

      <PageTitle title="Editar prato" />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          <FormGroup className="lg:w-fit">
            <Label title="Imagem do prato" htmlFor="dish-image" />
            <FileUploadButton
              title="Selecione uma imagem para alterá-la"
              register={register("image")}
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
              defaultValue={dish?.name}
              register={register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </FormGroup>

          <FormGroup className="lg:w-[464px]">
            <Label title="Categoria" htmlFor="category" />
            <Select
              register={register("category")}
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
                <Ingredient
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
            <Input
              id="price"
              type="number"
              defaultValue={dish?.price}
              register={register("price")}
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
            defaultValue={dish?.description}
            register={register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </FormGroup>

        <Button title="Salvar alterações" className="lg:w-[172px] lg:ml-auto" />
      </form>
    </div>
  );
}
