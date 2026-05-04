import React, { useState } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  border: 3px solid var(--clr-neutral-1000);
`;

const ModalContent = styled.div`
  background: var(--clr-green-100);
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 24px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: var(--clr-green-1000);
  margin-bottom: 16px;
  text-align: center;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600px;
  color: var(--clr-green-1000);
  margin: 16px 0 8px;
`;

const FilterGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: var(--clr-green-1000);
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 40px;
  border: none;
  background: var(--clr-green-500);
  font-size: 14px;
  color: var(--clr-neutral-1000);
  outline: none;
  box-shadow: 2px 2px 0 0 var(--clr-neutral-1000);

`;

const InputText = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 40px;
  background: var(--clr-green-500);
  font-size: 14px;
  color: var(--clr-neutral-1000);
  outline: none;
  box-shadow: 2px 2px 0 0 var(--clr-neutral-1000);

`;

const RadioGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 6px;

  label {
    background: var(--clr-green-500);
    padding: 8px 12px;
    border-radius: 40px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    color: var(--clr-green-900);
    box-shadow: 2px 2px 0 0 var(--clr-neutral-1000);

  }

  input {
    margin-right: 6px;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 6px;

  label {
    background: var(--clr-green-600);
    padding: 6px 10px;
    border-radius: 12px;
    border: 1px solid var(--clr-green-800);
    cursor: pointer;
    font-size: 14px;
    color: var(--clr-green-900);
    box-shadow: 2px 2px 0 0 var(--clr-neutral-1000);
  }

  input {
    margin-right: 6px;
  }
`;

const RangeSlider = styled.input`
  width: 100%;
  margin: 8px 0;
  accent-color: var(--clr-green-500);
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  gap: 12px;
`;

const Button = styled.button`
  padding: 10px 16px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  flex: 1;
  font-size: 14px;
  box-shadow: 2px 2px 0 0 var(--clr-neutral-1000);


  &.apply {
    background: var(--clr-green-500);
    color: black;
  }

  &.clear {
    background: var(--clr-green-500);
    color: black;
  }
`;

const FilterModal = ({ isOpen, onClose, onApply, initialFilters }) => {
  const [filters, setFilters] = useState(initialFilters);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    onApply(filters);
    onClose();
  };

  const clearFilters = () => {
    const emptyFilters = {
      distanciaMax: 5,
      tipoAnimal: "",
      idade: "",
      raca: "",
      temperamento: [],
      porte: "",
      sexo: "",
      vacinado: "",
      castrado: "",
    };
    setFilters(emptyFilters);
    onApply(emptyFilters);
    onClose();
  };
  
 return (
  <ModalOverlay onClick={onClose}>
    <ModalContent onClick={(e) => e.stopPropagation()}>
      <Title>Filtros</Title>

      {/* Distância */}
      <SectionTitle>Distância</SectionTitle>
      <FilterGroup>
        <Label>Máximo: {filters.distanciaMax} KM</Label>
        <RangeSlider
          type="range"
          min={0}
          max={20}
          step={1}
          value={filters.distanciaMax}
          onChange={(e) => handleChange("distanciaMax", Number(e.target.value))}
        />
      </FilterGroup>

      {/* Tipo Animal */}
      <SectionTitle>Tipo Animal</SectionTitle>
      <FilterGroup>
        <Select
          value={filters.tipoAnimal}
          onChange={(e) => handleChange("tipoAnimal", e.target.value)}
        >
          <option value="">Selecione</option>
          <option value="cat">Gato</option>
          <option value="dog">Cachorro</option>
        </Select>
      </FilterGroup>

      {/* Idade */}
      <SectionTitle>Idade do animal</SectionTitle>
      <FilterGroup>
        <Select
          value={filters.idade}
          onChange={(e) => handleChange("idade", e.target.value)}
        >
          <option value="">Selecione</option>
          <option value="0–2 meses">0–2 meses</option>
          <option value="2–4 meses">2–4 meses</option>
          <option value="4–6 meses">4–6 meses</option>
          <option value="6–12 meses">6–12 meses</option>
          <option value="1–2 anos">1–2 anos</option>
          <option value="2–5 anos">2–5 anos</option>
          <option value="5–8 anos">5–8 anos</option>
          <option value="8+ anos">8+ anos</option>
        </Select>
      </FilterGroup>

      {/* Raça */}
      <SectionTitle>Raça</SectionTitle>
      <FilterGroup>
        <InputText
          type="text"
          placeholder="Digite a raça"
          value={filters.raca}
          onChange={(e) => handleChange("raca", e.target.value)}
        />
      </FilterGroup>

      {/* Temperamento */}
      {/*<SectionTitle>Temperamento</SectionTitle>
      <FilterGroup>
        <CheckboxGroup>
          {["Dócil", "Brincalhão", "Calmo", "Ativo", "Sociável", "Protetor", "Independente", "Tímido"].map(
            (temp) => (
              <label key={temp}>
                <input
                  type="checkbox"
                  value={temp}
                  checked={filters.temperamento.includes(temp)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const newList = checked
                      ? [...filters.temperamento, temp]
                      : filters.temperamento.filter((t) => t !== temp);
                    handleChange("temperamento", newList);
                  }}
                />
                {temp}
              </label>
            )
          )}
        </CheckboxGroup>
      </FilterGroup>*/}

      {/* Porte */}
      <SectionTitle>Porte</SectionTitle>
      <FilterGroup>
        <RadioGroup>
          {["pequeno", "médio", "grande"].map((size) => (
            <label key={size}>
              <input
                type="radio"
                value={size}
                checked={filters.porte === size}
                onChange={() => handleChange("porte", size)}
              />
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </label>
          ))}
        </RadioGroup>
      </FilterGroup>

      {/* Sexo */}
      <SectionTitle>Sexo</SectionTitle>
      <FilterGroup>
        <RadioGroup>
          {["macho", "fêmea"].map((sex) => (
            <label key={sex}>
              <input
                type="radio"
                value={sex}
                checked={filters.sexo === sex}
                onChange={() => handleChange("sexo", sex)}
              />
              {sex.charAt(0).toUpperCase() + sex.slice(1)}
            </label>
          ))}
        </RadioGroup>
      </FilterGroup>

      {/* Vacinado */}
      <SectionTitle>Vacinado</SectionTitle>
      <FilterGroup>
        <RadioGroup>
          {["sim", "nao"].map((vac) => (
            <label key={vac}>
              <input
                type="radio"
                value={vac}
                checked={filters.vacinado === vac}
                onChange={() => handleChange("vacinado", vac)}
              />
              {vac === "sim" ? "Sim" : "Não"}
            </label>
          ))}
        </RadioGroup>
      </FilterGroup>

      {/* Castrado */}
      <SectionTitle>Castrado</SectionTitle>
      <FilterGroup>
        <RadioGroup>
          {["sim", "nao"].map((cas) => (
            <label key={cas}>
              <input
                type="radio"
                value={cas}
                checked={filters.castrado === cas}
                onChange={() => handleChange("castrado", cas)}
              />
              {cas === "sim" ? "Sim" : "Não"}
            </label>
          ))}
        </RadioGroup>
      </FilterGroup>

      <ButtonGroup>
        <Button className="clear" onClick={clearFilters}>
          Limpar filtros
        </Button>
        <Button className="apply" onClick={applyFilters}>
          Aplicar filtros
        </Button>
      </ButtonGroup>
    </ModalContent>
  </ModalOverlay>
);

};

export default FilterModal;