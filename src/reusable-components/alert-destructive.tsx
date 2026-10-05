import { WarningCircleIcon } from "@phosphor-icons/react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertDestructive({
  alertTitle,
  alertDescription,
}: {
  alertTitle: string;
  alertDescription: string;
}) {
  return (
    <Alert variant="destructive" className="max-w-md">
      <WarningCircleIcon />
      <AlertTitle>{alertTitle}</AlertTitle>
      <AlertDescription>
        {alertDescription}
      </AlertDescription>
    </Alert>
  );
}
