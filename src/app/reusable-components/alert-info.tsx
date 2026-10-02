import { InfoIcon } from "@phosphor-icons/react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertInfo({
  alertTitle,
  alertDescription,
}: {
  alertTitle: string;
  alertDescription: string;
}) {
  return (
    <div className="grid w-full max-w-md items-start gap-4">
      {/* <Alert>
        <InfoIcon />
        <AlertTitle>Payment successful</AlertTitle>
        <AlertDescription>
          Your payment of $29.99 has been processed. A receipt has been sent to
          your email address.
        </AlertDescription>
      </Alert> */}
      <Alert>
        <InfoIcon />
        <AlertTitle>{alertTitle}</AlertTitle>
        <AlertDescription>{alertDescription}</AlertDescription>
      </Alert>
    </div>
  );
}
