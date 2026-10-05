import { SealCheckIcon } from "@phosphor-icons/react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertSuccess({
  alertTitle,
  alertDescription,
}: {
  alertTitle: string;
  alertDescription: string;
}) {
  return (
    <Alert className="max-w-md">
      <SealCheckIcon />
      <AlertTitle>{alertTitle}</AlertTitle>
      <AlertDescription>{alertDescription}</AlertDescription>
    </Alert>
  );
}
