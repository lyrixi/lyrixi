import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
  Fragment
} from 'react'
import Modal from './../Modal'

import type { LocationComboProps, LocationComboRef, LocationValue } from '../types'

// 内库使用-start
import DataUtil from './../../../utils/DataUtil'
import ValidatorUtil from './../../../utils/ValidatorUtil'
import DOMUtil from './../../../utils/DOMUtil'
import GeoUtil from './../../../utils/GeoUtil'
import Map from './../../Map'
import Input from './../../Input'
import LocaleUtil from './../../../utils/LocaleUtil'
import type { GetAddressFn, GetLocationFn, MapPoint } from './../../Map/types'
import type { InputTextRef } from './../../Input/types'
import Icon from '../../Icon'
import Icons from '../../../icons'
// 内库使用-end

/* 测试使用-start
import { DataUtil, ValidatorUtil, DOMUtil, LocaleUtil, Input, Map } from 'lyrixi-mobile'
测试使用-end */

const { getAddress: defaultGetAddress, getLocation: defaultGetLocation, pointsToWgs84 } = Map

const LocationCombo = forwardRef<LocationComboRef, LocationComboProps>(
  (
    {
      // Combo: Value & Display Value
      id,
      value,
      placeholder,
      type = 'gcj02',
      getAddress,
      getLocation,
      cacheDuration,
      mapConfig,
      autoSize,
      errorText = LocaleUtil.locale(
        '定位失败, 请检查定位权限是否开启',
        'lyrixi_a96a3989d602067144139bf31bf27121'
      ),
      loadingText = LocaleUtil.locale('定位中...', 'lyrixi_2c4006447f62bffd57686aabbdc3f5dd'),
      // Combo: Status
      allowClear,
      disabled = false,
      editable = false,
      autoLocation = false,
      locationVisible = true,
      chooseVisible = false,
      previewVisible = false,
      clickAction,
      // Combo: Style
      className,
      // Modal: Style
      modalClassName,
      modalStyle,
      // Modal: Elements
      portal = document.getElementById('root') || document.body,
      // Events
      onChange,
      onOpen,
      onClose,
      onLocationStatusChange,
      onError
    },
    ref
  ) => {
    let address = value?.value || value?.address

    if (address && (!value?.value || !value?.address)) {
      value = { ...value, address, value: address }
    }

    const resolveGetAddress: GetAddressFn =
      typeof getAddress === 'function' ? getAddress : defaultGetAddress

    const resolveGetLocation: GetLocationFn =
      typeof getLocation === 'function' ? getLocation : defaultGetLocation

    const errMsgRef = useRef(errorText)

    let [locationStatus, setLocationStatus] = useState('1')

    const [modalOpen, setModalOpen] = useState('')

    const onChangeRef = useRef<((value: LocationValue | null) => void) | null | undefined>(onChange)

    onChangeRef.current = onChange

    const onErrorRef = useRef<
      ((error: { status: string; message: string }) => void) | null | undefined
    >(onError)

    onErrorRef.current = onError

    const comboRef = useRef<InputTextRef | null>(null)

    useEffect(() => {
      if (
        locationStatus === '0' &&
        value?.address &&
        GeoUtil.isPoint(value as MapPoint | null) &&
        value.type
      ) {
        setLocationStatus('1')
      }
      // eslint-disable-next-line
    }, [value])

    useEffect(() => {
      if (modalOpen) {
        onOpen?.()
      } else if (modalOpen === '') {
        return
      } else {
        onClose?.()
      }
      // eslint-disable-next-line
    }, [modalOpen])

    useEffect(() => {
      if (autoLocation !== true) return
      handleAutoLocation()
      // eslint-disable-next-line
    }, [autoLocation])

    useEffect(() => {
      if (onLocationStatusChange) {
        onLocationStatusChange(locationStatus)
      }
      // eslint-disable-next-line
    }, [locationStatus])

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return comboRef.current?.element ?? null
        }
      }
    })

    async function addAddress(val: LocationValue | null): Promise<LocationValue | string | null> {
      let newValue: LocationValue | string | null = val
      if (newValue && GeoUtil.isPoint(newValue as MapPoint | null)) {
        const pointValue = newValue as LocationValue
        const addrRes = await resolveGetAddress({
          ...pointValue,
          cacheDuration,
          type,
          latitude: Number(pointValue.latitude),
          longitude: Number(pointValue.longitude)
        })
        if (addrRes?.status === 'success' && addrRes.data?.address) {
          newValue = {
            ...pointValue,
            ...addrRes.data
          } as LocationValue
        } else {
          newValue = LocaleUtil.locale(
            '获取地址失败, 请稍后重试',
            'lyrixi_f1f199dd46c73946aa4b3140e98752a4'
          ) as string
        }
      }
      return newValue
    }

    async function handleAutoLocation() {
      if (value && GeoUtil.isPoint(value as MapPoint | null)) {
        if (value.value || value.address) {
          if (onChangeRef?.current) {
            onChangeRef.current(value)
          }
        } else {
          locationStatus = '-1'
          setLocationStatus('-1')

          const newValue = await addAddress(value)
          updateValue(newValue)
        }
      } else {
        handleLocation()
      }
    }

    function handleClick(e: React.MouseEvent) {
      e.stopPropagation()
      if (locationStatus === '-1') return
      if (disabled) return

      if (editable) {
        if (locationStatus === '0') {
          locationStatus = '1'
          setLocationStatus('1')
        }
        return
      }

      if (clickAction === 'location') {
        handleLocation()
        return
      }

      if (clickAction) {
        setModalOpen(clickAction)
        return
      }
    }

    function updateValue(newValue: LocationValue | string | null) {
      if (
        !newValue ||
        typeof newValue === 'string' ||
        !GeoUtil.isPoint(newValue as MapPoint | null)
      ) {
        errMsgRef.current = typeof newValue === 'string' ? newValue : errorText ?? ''
        if (onErrorRef?.current) {
          onErrorRef.current({
            status: 'error',
            message: `${errMsgRef.current}`
          })
        }
        locationStatus = '0'
        setLocationStatus('0')
        onChangeRef.current?.(null)
      } else {
        locationStatus = '1'
        setLocationStatus('1')

        if (newValue.address && !newValue.value) {
          newValue.value = newValue.address
        }
        onChangeRef.current?.(newValue)
      }
    }

    async function handleLocation() {
      locationStatus = '-1'
      setLocationStatus('-1')

      const locRes = await resolveGetLocation({
        cacheDuration,
        type
      })

      if (locRes?.status !== 'success' || !locRes.data) {
        updateValue((typeof locRes?.message === 'string' ? locRes.message : null) as string | null)
        return
      }

      const withAddress = await addAddress(locRes.data as LocationValue)
      updateValue(withAddress)
    }

    function renderRightIcon(): React.ReactNode[] {
      if (disabled) return []
      const rightIconNode: React.ReactNode[] = []

      if (chooseVisible) {
        rightIconNode.push(
          <i
            key="choose"
            id={id ? `${id}-choose` : undefined}
            className={DOMUtil.classNames(
              'lyrixi-location-combo-icon',
              'lyrixi-location-combo-icon-choose',
              modalOpen === 'choose' ? 'lyrixi-active' : ''
            )}
            onClick={(e) => {
              e.stopPropagation()
              setModalOpen('choose')
            }}
          ></i>
        )
      }

      if (previewVisible) {
        rightIconNode.push(
          <i
            key="preview"
            id={id ? `${id}-preview` : undefined}
            className={DOMUtil.classNames(
              'lyrixi-location-combo-icon',
              'lyrixi-location-combo-icon-preview',
              ValidatorUtil.isEmpty(value) ? 'lyrixi-disabled' : '',
              modalOpen === 'preview' ? 'lyrixi-active' : ''
            )}
            onClick={(e) => {
              e.stopPropagation()
              if (e.currentTarget.classList.contains('lyrixi-disabled')) return
              setModalOpen('preview')
            }}
          ></i>
        )
      }

      if (locationVisible) {
        rightIconNode.push(
          <Icon
            key="location"
            id={id ? `${id}-location` : undefined}
            svg={Icons.Update}
            size="xxxs"
            className={DOMUtil.classNames(
              'lyrixi-location-combo-icon',
              'lyrixi-location-combo-icon-location',
              locationStatus === '-1' ? 'lyrixi-active' : ''
            )}
            onClick={(e) => {
              e.stopPropagation()
              handleLocation()
            }}
          />
        )
      }
      return rightIconNode
    }

    const nearbyVisible =
      typeof chooseVisible === 'object' ? chooseVisible?.nearbyVisible : undefined

    const locationFormatter = () => {
      if (locationStatus === '-1') {
        return (
          <div className="lyrixi-location-combo-positioning lyrixi-input-text">{loadingText}</div>
        )
      }
      if (locationStatus === '0') {
        return (
          <div className="lyrixi-location-combo-error lyrixi-input-text">{errMsgRef.current}</div>
        )
      }
      return null
    }

    return (
      <Fragment>
        <Input.Text
          ref={comboRef}
          id={id}
          placeholder={placeholder}
          type={autoSize ? 'autoSize' : 'text'}
          rightIconRender={() => <>{renderRightIcon()}</>}
          formatter={locationFormatter}
          value={value?.value || value?.address || ''}
          allowClear={allowClear}
          readOnly={!editable}
          disabled={disabled}
          className={DOMUtil.classNames(
            'lyrixi-location-combo-success',
            'lyrixi-location-combo',
            className,
            locationStatus === '-1' ? 'lyrixi-positioning' : ''
          )}
          onClick={handleClick}
          onChange={(address, event) => {
            if (event?.action === 'clickClear') {
              if (onChange) onChange(null)
              return
            }
            const newValue = DataUtil.cloneDeep(value) || ({} as LocationValue)
            newValue.value = address
            newValue.address = address
            if (onChange) onChange(newValue)
          }}
        />

        <Modal
          cacheDuration={cacheDuration}
          mapConfig={mapConfig}
          getAddress={resolveGetAddress}
          getLocation={resolveGetLocation}
          open={modalOpen}
          allowClear={allowClear}
          nearbyVisible={nearbyVisible}
          modalClassName={modalClassName}
          modalStyle={modalStyle}
          portal={portal}
          value={value ? (pointsToWgs84(value as MapPoint, type) as LocationValue | null) : null}
          onClose={() => setModalOpen('')}
          onChange={(newValue: LocationValue | null) => {
            if (newValue) {
              updateValue(newValue)
            } else {
              onChange?.(null)
            }
          }}
        />
      </Fragment>
    )
  }
)

export default LocationCombo
