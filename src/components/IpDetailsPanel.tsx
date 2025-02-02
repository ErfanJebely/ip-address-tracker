"use client";

// Mui materials
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Divider,
} from "@mui/material";

// React query
import { useQuery } from "react-query";

// Components
import MapContainer from "./MapContainer";
import LoadingProgress from "./LoadingProgress";

// Utils
import { fetchIPDetails } from "@/utils/apiFetch";

export default function IpDetailsPanel({ query }: { query: string }) {
  // Get ip details from API using react-query
  const { data, error, isLoading } = useQuery(
    ["ipDetails", query],
    () => fetchIPDetails(query),
    {
      enabled: !!query,
      staleTime: 1000 * 60 * 5,
    }
  );

  if (isLoading) return <LoadingProgress />;
  if (error)
    alert("Oops! We couldn't find any information for the entered IP address.");

  return (
    <Box>
      {/* IP details panel */}
      <Box
        sx={{
          width: "100%",
          justifyItems: "center",
          position: "absolute",
          zIndex: "1",
          translate: { xs: "0 -120px", sm: "0 -58px" },
          paddingInline: { xs: "27px", sm: "0" },
        }}
      >
        <Card
          sx={{
            width: { xs: "100%", sm: "90%", md: "80%", lg: "70%" },
            padding: { xs: 1, sm: 2 },
            borderRadius: "15px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            overflow: "auto",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            divider={
              <Divider
                orientation="vertical"
                flexItem
                sx={{ marginLeft: "50px" }}
              />
            }
            sx={{ alignItems: "start" }}
          >
            <CardContent
              sx={{
                width: { xs: "100%", sm: "auto" },
                flex: "1 0 auto",
                justifyItems: { xs: "center", sm: "start" },
              }}
            >
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ letterSpacing: "1px", color: "#9e9e9e" }}
              >
                IP ADDRESS
              </Typography>

              <Typography
                sx={{ fontWeight: "500" }}
                component="div"
                variant="h5"
              >
                {data.ip ? data.ip : "---"}
              </Typography>
            </CardContent>

            <CardContent
              sx={{
                width: { xs: "100%", sm: "auto" },
                flex: "1 0 auto",
                justifyItems: { xs: "center", sm: "start" },
              }}
            >
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ letterSpacing: "1px", color: "#9e9e9e" }}
              >
                LOCATION
              </Typography>

              <Typography
                sx={{ fontWeight: "500" }}
                component="div"
                variant="h5"
              >
                {data.location
                  ? `${data.location.country}, ${data.location.city}`
                  : "---"}
              </Typography>
            </CardContent>

            <CardContent
              sx={{
                width: { xs: "100%", sm: "auto" },
                flex: "1 0 auto",
                justifyItems: { xs: "center", sm: "start" },
              }}
            >
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ letterSpacing: "1px", color: "#9e9e9e" }}
              >
                TIME ZONE
              </Typography>

              <Typography
                sx={{ fontWeight: "500" }}
                component="div"
                variant="h5"
              >
                {data.location.timezone ? data.location.timezone : "---"}
              </Typography>
            </CardContent>

            <CardContent
              sx={{
                width: { xs: "100%", sm: "auto" },
                flex: "1 0 auto",
                justifyItems: { xs: "center", sm: "start" },
                ":last-child": { paddingBottom: "16px" },
              }}
            >
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ letterSpacing: "1px", color: "#9e9e9e" }}
              >
                ISP
              </Typography>

              <Typography
                sx={{ fontWeight: "500" }}
                component="div"
                variant="h5"
              >
                {data.isp ? data.isp : "---"}
              </Typography>
            </CardContent>
          </Stack>
        </Card>
      </Box>

      {/* Map */}
      <MapContainer lat={data.location.lat} lng={data.location.lng} />
    </Box>
  );
}
