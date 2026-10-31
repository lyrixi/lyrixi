import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react'

import FormContext from './context/FormContext'

import type { FieldEntity } from './context/FormContext'
import type { FieldData, FormProps, FormRef } from './types'

// 内库使用-start
import DOMUtil from './../../utils/DOMUtil'
import Toast from './../Toast'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, Toast } from 'lyrixi-mobile'
测试使用-end */

// 约定 validator 只能 reject / throw Error
function getRejectMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message
  return 'Validation failed'
}

const Form = forwardRef<FormRef, FormProps>(
  ({ children, label, content, style, className, onFieldsChange }, ref) => {
    const rootRef = useRef<HTMLDivElement>(null)
    // 已注册字段，Field组件初始化完成
    const fieldsRef = useRef<Record<string, FieldEntity>>({})

    // 未注册字段，Field组件初始化register时回填
    const fieldsPendingRef = useRef<Record<string, unknown>>({})

    // 表单级字段变化回调，对应 Form 的 onFieldsChange
    const onFieldsChangeRef = useRef(onFieldsChange)
    onFieldsChangeRef.current = onFieldsChange

    // 获取单个字段的值
    const getFieldValue = useCallback((name: string) => {
      const field = fieldsRef.current[name]
      if (field) return field.getValue()
      return fieldsPendingRef.current[name]
    }, [])

    // 获取字段数据，不传 nameList 则返回全部
    const getFieldsData = useCallback(
      (nameList?: string[]): FieldData[] => {
        const names = nameList?.length
          ? nameList
          : Array.from(
              new Set([...Object.keys(fieldsRef.current), ...Object.keys(fieldsPendingRef.current)])
            )
        return names.map((name) => ({
          name,
          value: getFieldValue(name),
          errors: []
        }))
      },
      [getFieldValue]
    )

    // 获取字段值，基于 getFieldsData
    const getFieldsValue = useCallback(
      (nameList?: string[]) => {
        const values: Record<string, unknown> = {}
        getFieldsData(nameList).forEach((field) => {
          values[field.name] = field.value
        })
        return values
      },
      [getFieldsData]
    )

    // 设置字段值
    const setFieldsValue = useCallback((values: Record<string, unknown>) => {
      Object.keys(values || {}).forEach((name) => {
        const field = fieldsRef.current[name]
        if (field) {
          field.setValue(values[name])
        } else {
          fieldsPendingRef.current[name] = values[name]
        }
      })
    }, [])

    // 校验字段
    const validateFields = useCallback(
      async (nameList?: string[]) => {
        const names = nameList?.length ? nameList : Object.keys(fieldsRef.current)
        const errorFields: FieldData[] = []

        for (const name of names) {
          const field = fieldsRef.current[name]
          const value = getFieldValue(name)
          if (!field?.validator) continue

          try {
            await field.validator(value)
          } catch (error) {
            errorFields.push({
              name,
              value,
              errors: [getRejectMessage(error)]
            })
          }
        }

        if (errorFields.length) {
          const firstMessage = errorFields[0]?.errors?.[0]
          if (firstMessage) {
            Toast.open({ content: firstMessage })
          }
          return Promise.reject({ errorFields })
        }

        return getFieldsValue()
      },
      [getFieldValue, getFieldsValue]
    )

    // 滚动到指定字段
    const scrollToField = useCallback((name: string) => {
      const element = rootRef.current?.querySelector(`#form-field-${name}`)
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, [])

    useImperativeHandle(
      ref,
      () => ({
        get element() {
          return rootRef.current
        },
        getFieldValue,
        getFieldsValue,
        setFieldsValue,
        validateFields,
        scrollToField
      }),
      [getFieldValue, getFieldsValue, setFieldsValue, validateFields, scrollToField]
    )

    const register = useCallback((name: string, field: FieldEntity) => {
      fieldsRef.current[name] = field
      if (Object.prototype.hasOwnProperty.call(fieldsPendingRef.current, name)) {
        field.setValue(fieldsPendingRef.current[name])
        delete fieldsPendingRef.current[name]
      }
    }, [])

    const unregister = useCallback((name: string) => {
      delete fieldsRef.current[name]
    }, [])

    // Field组件值变化时通知 Form
    const onFieldChange = useCallback(
      (name: string, value: unknown) => {
        if (!onFieldsChangeRef.current) return
        onFieldsChangeRef.current([{ name, value, errors: [] }], getFieldsData())
      },
      [getFieldsData]
    )

    const contextValue = useMemo(
      () => ({
        register,
        unregister,
        label,
        content,
        onFieldChange
      }),
      [register, unregister, label, content, onFieldChange]
    )

    return (
      <FormContext.Provider value={contextValue}>
        <div ref={rootRef} style={style} className={DOMUtil.classNames('lyrixi-form', className)}>
          {children}
        </div>
      </FormContext.Provider>
    )
  }
)

export default Form
