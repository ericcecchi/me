import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import React, {
  FunctionComponent,
  SyntheticEvent,
  useCallback,
  useState,
} from 'react';

export type SelectOption = {
  value: string;
  text: string;
};

type OnChangeFunction = (e: SyntheticEvent<HTMLElement>) => void;

export interface FormField extends FormControlProps {
  label: string;
  placeholder?: string;
  options?: Array<SelectOption>;
  errors?: Array<string>;
  value: string;
  onChange: OnChangeFunction;
}

export const useInput = (
  initialValue: string = ''
): [string, OnChangeFunction] => {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback((e) => setValue(e.currentTarget.value), [
    setValue,
  ]);
  return [value, onChange];
};

export const FormField: FunctionComponent<FormField> = (props) => {
  const {
    value,
    onChange,
    label,
    placeholder,
    options,
    errors,
    ...rest
  } = props;
  return (
    <FormControl isInvalid={!!errors?.length} {...rest}>
      <FormLabel htmlFor="promptInput">{label}</FormLabel>
      {options ? (
        <Select id="promptInput" onChange={onChange}>
          {' '}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              selected={value === option.value}
            >
              {option.text}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          id="promptInput"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
      {errors?.map((error) => (
        <FormErrorMessage>{error}</FormErrorMessage>
      ))}
    </FormControl>
  );
};
