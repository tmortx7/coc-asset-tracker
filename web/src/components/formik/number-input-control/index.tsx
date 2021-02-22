import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';
import React, { FC, ReactNode } from 'react';
import { BaseProps } from '../base-props';
import { FormControl } from '../form-control';

export type NumberInputControlProps = BaseProps & {
  numberInputProps?: NumberInputProps;
  showStepper?: boolean;
  children?: ReactNode;
};

export const NumberInputControl: FC<NumberInputControlProps> = (
  props: NumberInputControlProps
) => {
  const {
    name,
    label,
    showStepper = true,
    children,
    numberInputProps,
    ...rest
  } = props;
  const [field, { error, touched }] = useField(name);
  const { setFieldValue } = useFormikContext();

  const $setFieldValue = (name: string) => (value: any) =>
    setFieldValue(name, value);

  return (
    <FormControl name={name} label={label} {...rest}>
      <NumberInput
        {...field}
        id={name}
        onChange={$setFieldValue(name)}
        isInvalid={!!error && touched}
        {...numberInputProps}
      >
        <NumberInputField name={name} />
        {showStepper && (
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        )}
        {children}
      </NumberInput>
    </FormControl>
  );
};

export default NumberInputControl;
