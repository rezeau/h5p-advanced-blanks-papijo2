import { Blank } from '../models/blank';
import { MessageType } from '../models/enums';

export class MessageService {
  private speechBubble;
  private associatedBlank: Blank;
  
  constructor(private jQuery: JQueryStatic) {

  }

  public show(elementId: string, message: string, blank: Blank, type?: MessageType) {
    if (!type)
      type = MessageType.None;

    const elements = this.jQuery("#" + elementId);

    if (elements.length > 0) {
      this.speechBubble = new H5P.JoubelSpeechBubble(elements, message);
      this.associatedBlank = blank;
    }
  }

  public hide() {
    if (this.speechBubble) {
      try {
        this.speechBubble.remove();
      }
      catch {
        // Intentionally empty - ignoring errors here
      }
    }
    this.speechBubble = undefined;
    this.associatedBlank = undefined;
  }

  public isActive(blank: Blank) {
    return this.associatedBlank === blank;
  }
}