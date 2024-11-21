import React from "react";
import Input from "../Input";
import Button from "../Button";

const formTypes = {
  INPUT: "input",
};

export default function Form({
  formControl = [],
  formData,
  setFormData,
  btnText,
  handleSubmit,
  className,
  inputClassName,
  ButtonClassName,
}) {
  function renderFromElement(element) {
    let content = null;
    switch (element?.componentType) {
      case formTypes.INPUT:
        content = (
          <Input
            type={element.type}
            name={element.name}
            placeholder={element.placeholder}
            required={element.required}
            value={formData[element.name] || ""}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            className={inputClassName}
          />
        );
        break;
      default:
        content = (
          <Input
            type={element.type}
            name={element.name}
            placeholder={element.placeholder}
            required={element.required}
            value={formData[element.name] || ""}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        );
        break;
    }
    return content;
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {formControl?.length
        ? formControl?.map((element) => renderFromElement(element))
        : null}
      <Button text={btnText} type="submit" className={ButtonClassName} />
    </form>
  );
}
