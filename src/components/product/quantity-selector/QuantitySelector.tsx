'use client';

import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
  quantity: number;

  onQuantityChanged: (value: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
  const onValueChanged = (value: number) => {
    if (quantity + value < 1) return;

    onQuantityChanged(quantity + value);
  };

  return (
    <div className="flex">
      <button onClick={() => onValueChanged(-1)} className="hover:text-primary">
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className="mx-3 flex w-20 items-center justify-center rounded bg-neutral px-5">
        {quantity}
      </span>

      <button onClick={() => onValueChanged(+1)} className="hover:text-primary">
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
