import {toast} from 'react-toastify';
import React, {useState} from 'react';
import {Food} from '@instinct-plugin/roleplay-types';
import {EditFoodModalProps} from './EditFoodModal.types';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import {EditModal} from '../../../components/edit-modal/EditModal';
import {FoodTypeSelector} from './food-type-selector/FoodTypeSelector';

export function EditFoodModal({food, onChange}: EditFoodModalProps) {
  const [foodDTO, setFoodDTO] = useState(food);

  function updateFoodDTO(changes: Partial<Food>) {
    setFoodDTO(_ => ({
      ..._,
      ...changes,
    }));
  }

  async function onSubmit() {
    toast.success(`${food.name} has been updated successfully`);
    onChange();
  }

  return (
    <EditModal
      header={
        <>
          Editing <b>{food.name}</b>
        </>
      }
      onSubmit={onSubmit}
    >
      <Form submit={onSubmit}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            value={foodDTO.name}
            onChange={_ => updateFoodDTO({name: _.target.value})}
          />
        </FormGroup>
        <FormGroup>
          <Label>Type</Label>
          <FoodTypeSelector
            foodType={food.type}
            onChange={_ => updateFoodDTO({type: _})}
          />
        </FormGroup>
        <FormGroup>
          <Label>Health Gained</Label>
          <Input
            type="number"
            value={foodDTO.healthGained}
            onChange={_ =>
              updateFoodDTO({healthGained: Number(_.target.value)})
            }
          />
        </FormGroup>
        <FormGroup>
          <Label>Energy Gained</Label>
          <Input
            type="number"
            value={foodDTO.energyGained}
            onChange={_ =>
              updateFoodDTO({energyGained: Number(_.target.value)})
            }
          />
        </FormGroup>
        <FormGroup>
          <Label>Hunger Restored</Label>
          <Input
            type="number"
            value={foodDTO.hungerRestored}
            onChange={_ =>
              updateFoodDTO({hungerRestored: Number(_.target.value)})
            }
          />
        </FormGroup>
      </Form>
    </EditModal>
  );
}
