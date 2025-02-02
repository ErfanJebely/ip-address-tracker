"use client";

// Mui materials
import { TextField, Box, Typography, IconButton } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// React hook form
import { SubmitHandler, useForm } from "react-hook-form";

// Components
import HandleNotice from "./HandleNotice";

// Form declaration
type FormValues = {
  query: string;
};

export default function SearchForm({
  onSubmit,
}: {
  onSubmit: (query: string) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const ipRegex =
    /^(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)$/;

  const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
    onSubmit(data.query);
  };

  return (
    <>
      {/* Form container */}
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{
          height: "100%",
          backgroundImage: {
            xs: "url('/pattern-bg-mobile.png')",
            sm: "url('/pattern-bg-desktop.png')",
          },
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box
          textAlign="center"
          sx={{
            maxWidth: "600px",
            width: "100%",
            marginBottom: { xs: "150px", sm: "60px" },
            marginTop: { xs: "30px", sm: "0" },
            marginInline: "25px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontWeight: "400",
              marginBottom: "20px",
              fontSize: {
                xs: "25px",
                sm: "30px",
                md: "35px",
              },
            }}
          >
            IP Address Tracker
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: "15px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              overflow: "hidden",
              width: "100%",
            }}
          >
            <TextField
              {...register("query", { required: true, pattern: ipRegex })}
              placeholder="Search for any IP address or domain"
              variant="outlined"
              fullWidth
              InputProps={{
                sx: {
                  borderRadius: "15px 0 0 15px",
                  padding: "0.5px 10px",
                },
              }}
            />

            {errors.query && (
              <HandleNotice
                error={{ open: true, message: "Invalid IP address format" }}
              />
            )}

            <IconButton
              type="submit"
              disableRipple
              sx={{
                backgroundColor: "black",
                color: "white",
                borderRadius: "0 15px 15px 0",
                padding: "11px 11px",
              }}
            >
              <ChevronRightIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}
