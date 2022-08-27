import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";

export default function Input({ name, ...inputProps }: any) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          error={error !== undefined}
          helperText={error?.message}
          {...inputProps}
        />
      )}
    />
  );
}
