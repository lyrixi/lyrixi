// 内库使用-start
import LocaleUtil from './../../../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

const tabs = function getTabs() {
  if (window.google) {
    return [
      {
        name: LocaleUtil.locale('购物', 'lyrixi_32c3a89ac8027081464f7478c53072ba'),
        id: 'store'
      },
      {
        name: LocaleUtil.locale('吃喝', 'lyrixi_44e3c960d410886dd9bd41366205f2f7'),
        id: 'restaurant'
      },
      {
        name: LocaleUtil.locale('娱乐', 'lyrixi_9acf9c6f117a4c2d02de30294ec29da9'),
        id: 'amusement_park,aquarium,movie_theater,museum,night_club,park,zoo'
      },
      {
        name: LocaleUtil.locale('景点', 'lyrixi_0791d135a6648910b0010b4a661a651d'),
        id: 'library,park,rv_park'
      },
      {
        name: LocaleUtil.locale('出行', 'lyrixi_486da317f8aa3d529a85dad60462a215'),
        id: 'airport,bus_station,subway_station,taxi_stand,train_station,transit_station'
      },
      {
        name: LocaleUtil.locale('住宿', 'lyrixi_d8bb4b3a9d1ea482bb39aa1d1e14b539'),
        id: 'hotel,motel,campground,rv_park'
      }
    ]
  }

  if (window.BMap) {
    return [
      {
        name: LocaleUtil.locale('购物', 'lyrixi_32c3a89ac8027081464f7478c53072ba')
      },
      {
        name: LocaleUtil.locale('吃喝', 'lyrixi_44e3c960d410886dd9bd41366205f2f7')
      },
      {
        name: LocaleUtil.locale('生活', 'lyrixi_aefcbfca08c840aeb8bd72dc1c8ff7f9')
      },
      {
        name: LocaleUtil.locale('娱乐', 'lyrixi_9acf9c6f117a4c2d02de30294ec29da9')
      },
      {
        name: LocaleUtil.locale('景点', 'lyrixi_0791d135a6648910b0010b4a661a651d')
      },
      {
        name: LocaleUtil.locale('出行', 'lyrixi_486da317f8aa3d529a85dad60462a215'),
        id: '公交地铁'
      },
      {
        name: LocaleUtil.locale('住宿', 'lyrixi_d8bb4b3a9d1ea482bb39aa1d1e14b539')
      }
    ]
  }

  return [
    {
      name: LocaleUtil.locale('购物', 'lyrixi_32c3a89ac8027081464f7478c53072ba'),
      id: 'shop'
    },
    {
      name: LocaleUtil.locale('吃喝', 'lyrixi_44e3c960d410886dd9bd41366205f2f7'),
      id: 'restaurant'
    }
  ]
}
export default tabs
