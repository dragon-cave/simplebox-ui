// src/components/UserProfileForm.test.tsx
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from 'axios';
import UserProfileForm from "../profile"; // Adjust the import path as necessary
import { endpoints } from "../../../../services/api"; // Adjust the import path as necessary

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const queryClient = new QueryClient();

describe("UserProfileForm", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders the form with initial data", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        username: "testuser",
        full_name: "Test User",
        description: "Test Description",
        email: "testuser@example.com",
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <UserProfileForm title="Edit Profile" />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Username/i)).toHaveValue("testuser");
      expect(screen.getByLabelText(/Nome Completo/i)).toHaveValue("Test User");
      expect(screen.getByLabelText(/Descrição/i)).toHaveValue("Test Description");
      expect(screen.getByLabelText(/Email/i)).toHaveValue("testuser@example.com");
    });
  });

  it("allows the user to update profile", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        username: "testuser",
        full_name: "Test User",
        description: "Test Description",
        email: "testuser@example.com",
      },
    });

    mockedAxios.patch.mockResolvedValueOnce({
      data: {
        full_name: "Updated User",
        description: "Updated Description",
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <UserProfileForm title="Edit Profile" />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Nome Completo/i)).toHaveValue("Test User");
    });

    fireEvent.change(screen.getByLabelText(/Nome Completo/i), {
      target: { value: "Updated User" },
    });
    fireEvent.change(screen.getByLabelText(/Descrição/i), {
      target: { value: "Updated Description" },
    });

    fireEvent.click(screen.getByText(/Atualizar Perfil/i));

    await waitFor(() => {
      expect(mockedAxios.patch).toHaveBeenCalledWith(
        endpoints.user,
        expect.objectContaining({
          full_name: "Updated User",
          description: "Updated Description",
        })
      );
    });
  });
});
