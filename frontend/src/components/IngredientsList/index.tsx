interface IngredientsListProps {
  ingredient: string;
}

export function IngredientsList({ ingredient }: IngredientsListProps) {
  return (
    <div className="bg-dark-1000 w-fit rounded-md py-1 px-2">
      <p>{ingredient}</p>
    </div>
  );
}
