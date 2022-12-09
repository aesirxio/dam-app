/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { FORM_FIELD_TYPE } from '../constants/FormFieldType';
import { Form } from 'react-bootstrap';

const Label = React.lazy(() => import('../components/Form/Label'));
const FormAgeField = React.lazy(() => import('../components/Form/FormAgeField'));
const FormLocationField = React.lazy(() => import('../components/Form/FormLocationField'));
const FormDateRangePicker = React.lazy(() => import('../components/Form/FormDateRangePicker'));
const CustomizedDatePicker = React.lazy(() => import('../components/DatePicker'));
const FormImage = React.lazy(() => import('../components/Form/FormImage'));
const FormSelection = React.lazy(() => import('../components/Form/FormSelection'));
const FormSelectionPersona = React.lazy(() => import('../components/Form/FormSelectionPersona'));
const FormInformation = React.lazy(() => import('../components/FormInformation'));
const FormSelectDropdown = React.lazy(() => import('../components/Form/FormSelectDropdown'));
const FormPriceField = React.lazy(() => import('../components/Form/FormPriceField'));
const FormRadio = React.lazy(() => import('../components/Form/FormRadio'));

const Input = React.lazy(() => import('../components/Form/Input'));

const renderingGroupFieldHandler = (group, validator) => {
  return Object.keys(group.fields)
    .map((fieldIndex) => {
      return [...Array(group.fields[fieldIndex])].map((field) => {
        return (() => {
          let className = field.className ? field.className : '';
          switch (field.type) {
            case FORM_FIELD_TYPE.INPUT:
              return (
                <Form.Group key={field.key} className={`mb-3 ${className}`}>
                  <Label
                    text={field.label}
                    className={field.labelClassName}
                    required={field.required ?? false}
                  />
                  <Input field={field} />
                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );
            case FORM_FIELD_TYPE.TEXTAREA:
              return (
                <Form.Group key={field.key} className={`mb-3 ${className}`}>
                  <Label
                    className={field.labelClassName}
                    text={field.label}
                    required={field.required ?? false}
                  />
                  <Form.Control
                    as="textarea"
                    defaultValue={field.value}
                    required={field.required ?? false}
                    id={field.key}
                    onChange={field.changed ?? undefined}
                    onBlur={field.blurred ?? undefined}
                  />

                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );

            case FORM_FIELD_TYPE.DATERANGE:
              return (
                <FormDateRangePicker
                  key={Math.random(40, 200)}
                  field={field}
                  validator={validator}
                />
              );
            case FORM_FIELD_TYPE.IMAGE:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-3 ${className}`}>
                  <Label text={field.label} required={field.required ?? false} />

                  <FormImage key={Math.random(40, 200)} field={field} />
                </Form.Group>
              );

            case FORM_FIELD_TYPE.SELECTION:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-3 ${className}`}>
                  {field.label && <Label text={field.label} required={field.required ?? false} />}

                  <FormSelection key={Math.random(40, 200)} field={field} />

                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );
            case FORM_FIELD_TYPE.SELECTIONPERSONA:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-3 ${className}`}>
                  <Label text={field.label} required={field.required ?? false} />

                  <FormSelectionPersona key={Math.random(40, 200)} field={field} />

                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );
            case FORM_FIELD_TYPE.DROPDOWN:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-3 ${className}`}>
                  {field.label && <Label text={field.label} required={field.required ?? false} />}
                  <FormSelectDropdown field={field} />
                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );
            case FORM_FIELD_TYPE.RADIO:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-3 ${className}`}>
                  <Label text={field.label} required={field.required ?? false} />
                  <FormRadio field={field} />
                </Form.Group>
              );

            case FORM_FIELD_TYPE.INFORMATION:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-3 ${className}`}>
                  <Label text={field.label} required={field.required ?? false} />
                  <FormInformation field={field} />
                </Form.Group>
              );

            case FORM_FIELD_TYPE.BIRTHDAY:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-3 ${className}`}>
                  <Label text={field.label} />
                  <div className="form-control w-full">
                    <CustomizedDatePicker
                      handleOnChange={(date) => field.changed(date)}
                      defaultDate={field.value ? field.value.split(' ')[0] : null}
                    />
                  </div>
                </Form.Group>
              );

            case FORM_FIELD_TYPE.PRICE:
              return (
                <Form.Group key={field.key} className={`mb-3 ${className}`}>
                  <Label text={field.label} required={field.required ?? false} />

                  <FormPriceField key={field.key} field={field} validator={validator} />

                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );

            case FORM_FIELD_TYPE.AGE:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-3 ${className}`}>
                  <Label text={field.label} required={field.required ?? false} />
                  <FormAgeField field={field} />
                  {field.validation &&
                    validator.message(field.label, field.valueFrom, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );

            case FORM_FIELD_TYPE.LOCATION:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-3 ${className}`}>
                  <Label text={field.label} required={field.required ?? false} />
                  <FormLocationField field={field} validator={validator} />
                </Form.Group>
              );

            default:
              return null;
          }
        })();
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
};

export { renderingGroupFieldHandler };
