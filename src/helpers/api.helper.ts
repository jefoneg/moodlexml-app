import { CommonConstant } from "../constants/common.constant";

export class ApiHelper {
  public static async api(endpoint: string, payload: any) {
    return await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: payload }),
    });
  }

  public static downloadXML(xml: string) {
    const blob = new Blob([xml], {
      type: CommonConstant.RESPONSE_TYPES.APP_XML,
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "lms-moodle.xml";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }
}
