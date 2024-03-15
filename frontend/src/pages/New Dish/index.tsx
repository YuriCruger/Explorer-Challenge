import { Button } from "@/components/Button";
import { FormGroup } from "@/components/FormGroup";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { PageTitle } from "@/components/Page Title";
import { PreviousPageButton } from "@/components/PreviousPageButton";

export default function NewDish() {
  return (
    <div className="px-7 pt-3 pb-12 space-y-6">
      <PreviousPageButton />

      <PageTitle title="Novo prato" />

      <form className="flex flex-col gap-6">
        <FormGroup>
          <Label title="Imagem do prato" />
          <Input placeholder="Ex.: Salada Ceasar" />
        </FormGroup>

        <FormGroup>
          <Label title="Nome" />
          <Input placeholder="Ex.: Salada Ceasar" />
        </FormGroup>

        <FormGroup>
          <Label title="Categoria" />
          <Input placeholder="Ex.: Salada Ceasar" />
        </FormGroup>

        <FormGroup>
          <Label title="Ingredientes" />
          <Input placeholder="Ex.: Salada Ceasar" />
        </FormGroup>

        <FormGroup>
          <Label title="Preço" />
          <Input placeholder="Ex.: Salada Ceasar" />
        </FormGroup>

        <FormGroup>
          <Label title="Descrição" />
          <Input placeholder="Ex.: Salada Ceasar" />
        </FormGroup>

        <Button title="Salvar alterações" />
      </form>
    </div>
  );
}
