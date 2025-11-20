"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { client } from "@/hono/client";
import { SignoutButton } from "@/components/auth/signout-button";
import { useQuery } from "@tanstack/react-query";

export const HomePageContents = () => {
  const { data: demoData, isLoading, isError } = useQuery({
    queryKey: ['demo'],
    queryFn: async () => {
      const response = await client.api.demo.$get();
      const data = await response.json();
      return data;
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full gap-8 p-4">
      <h1 className="text-4xl font-bold">Welcome to Next.js + Hono</h1>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Hono.js Demo</CardTitle>
          <CardDescription>Type-safe API call from client to server</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : isError ? (
            <p className="text-destructive">Failed to load demo data</p>
          ) : demoData ? (
            <div className="space-y-4">
              <div>
                <p className="font-semibold">{demoData.message}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(demoData.timestamp).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="font-semibold mb-2">Features:</p>
                <ul className="list-disc list-inside space-y-1">
                  {demoData.features.map((feature: string, index: number) => (
                    <li key={index} className="text-sm">{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <SignoutButton/>
    </div>
  );
};