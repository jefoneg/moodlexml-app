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
}
