import React from 'react';

import { useQuery } from "react-query";

import { api, endpoints } from "../../services/api";

const DashboardPage = () => {
    const { data, refetch } = useQuery(
        ["user"],
        async () => {
          console.log("Fazendo a query user");
          const response = await api.get(
            endpoints.user
          );
          return response;
        },
        { refetchOnWindowFocus: false }
      );
    return ( <>{data ? "True" : "Nada"}</> );
}
 
export default DashboardPage;