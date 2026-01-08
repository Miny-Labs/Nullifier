"use client";

import { useCallback, useEffect, useState } from "react";
import { usePlaidLink, PlaidLinkOptions } from "react-plaid-link";
import { Button } from "@/components/ui/button";
import { createLinkToken, exchangePublicToken } from "@/lib/plaid";

interface PlaidLinkProps {
  onSuccess: (accessToken: string, itemId: string) => void;
  onError?: (error: Error) => void;
}

export function PlaidLink({ onSuccess, onError }: PlaidLinkProps) {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        setIsLoading(true);
        const token = await createLinkToken();
        setLinkToken(token);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to initialize Plaid";
        setError(message);
        onError?.(err instanceof Error ? err : new Error(message));
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinkToken();
  }, [onError]);

  const onPlaidSuccess = useCallback(
    async (publicToken: string) => {
      try {
        setIsLoading(true);
        const { accessToken, itemId } = await exchangePublicToken(publicToken);
        onSuccess(accessToken, itemId);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to exchange token";
        setError(message);
        onError?.(err instanceof Error ? err : new Error(message));
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess, onError]
  );

  const config: PlaidLinkOptions = {
    token: linkToken,
    onSuccess: (publicToken) => onPlaidSuccess(publicToken),
    onExit: (err) => {
      if (err) {
        setError(err.display_message || "Connection cancelled");
      }
    },
  };

  const { open, ready } = usePlaidLink(config);

  if (error) {
    return (
      <div className="text-center">
        <p className="text-sm text-destructive mb-2">{error}</p>
        <Button
          variant="outline"
          onClick={() => {
            setError(null);
            setLinkToken(null);
          }}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => open()}
      disabled={!ready || isLoading}
      className="w-full"
      size="lg"
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Connecting...
        </span>
      ) : (
        "Connect Bank Account"
      )}
    </Button>
  );
}
