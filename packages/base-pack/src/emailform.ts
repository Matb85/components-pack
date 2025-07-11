export interface FormFieldConfigI {
  el: HTMLInputElement | HTMLTextAreaElement;
  isOk: (value: string) => boolean;
}

export type FormCallbackT = (data: FormData) => void;

export function setUpForm(form: HTMLFormElement, fields: FormFieldConfigI[], callback: FormCallbackT): void {
  form.addEventListener("submit", event => {
    event.preventDefault();
    const formData = new FormData(form);
    const data: Record<string, string> = {};

    let isOk = true;

    fields.forEach(field => {
      const name = field.el.name;
      if (formData.has(name)) {
        data[name] = formData.get(name) as string;
        if (!field.isOk(data[name])) isOk = false;
      }
    });
    console.log("Form submitted with data:", data);
    if (isOk) callback(formData);
  });

  for (const field of fields) {
    if (!field.el) {
      console.warn("@matb85/base-pack: Element not found", field.el);
      continue;
    }
    field.el.addEventListener("blur", () => {
      const value = field.el.value.trim();
      field.isOk(value);
    });
  }
}
