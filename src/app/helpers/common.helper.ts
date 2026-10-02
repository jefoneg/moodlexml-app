import { CommonConstant } from "@/constants/common.constant";

export class CommonHelper {
  public static parseResponseText(text: string | undefined): any {
    let responseText = undefined;

    if (typeof text === "string") {
      responseText = JSON.parse(text);
    } else {
      responseText = text;
    }

    return responseText;
  }

  public static handleScrollTop(elementId: string) {
    const element = document.getElementById(elementId);

    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  public static handleBeforeUnload(event: BeforeUnloadEvent) {
    event.preventDefault();
    event.returnValue = CommonConstant.SEPARATOR.EMPTY_STRING;
  }
}
