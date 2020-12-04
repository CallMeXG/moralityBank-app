import loginPage from '../pages/login/login'
import home from '../pages/home/index'
import register from '../pages/register/index'
import forget from '../pages/forgetPwd/index'
import first from '../pages/first-page/index'
import message from '../pages/message-page/index'
import TaskDetailPage from '../pages/message-page/taskDetail'
import mine from '../pages/mine-page/index'
import MineAbility from '../pages/mine-page/mine-ability'
import UpdateAbility from '../pages/mine-page/mine-ability/updateAbility'
import MineNeeds from '../pages/mine-page/mine-needs'
import MineSocreManager from '../pages/mine-page/mine-score-manager'
import MineScoreList from '../pages/mine-page/mine-score-manager/socreList'
import GuidePage from '../pages/guidePage'
import ReleaseAbility from '../pages/releaseAbility'
import ReleaseNeeds from '../pages/releaseNeeds'
import UpdatePwd from '../pages/mine-page/updatePwd'
import ApplyUserType from '../pages/apply-user-type'
import ApplyVolType from '../pages/apply-user-type/checker-vol-type'
import VolInput from '../pages/apply-user-type/vol-input'
import ApplySubmitSuccess from '../pages/apply-user-type/submit-success'
import ApplyVolOrgInput from '../pages/apply-user-type/vol-org-input'
import ApplyServiceInput from '../pages/apply-user-type/apply-sevice-input'
import ApplySQWorkMan from '../pages/apply-user-type/apply-sqwork-man'
import ReleaseAbilitySuccess from '../pages/releaseAbility/reAbilitySuccess'
import ReleaseNeedsSuccess from '../pages/releaseNeeds/reNeedsSuccess'
import PublicList from '../pages/public-list'
import IntegalShopping from '../pages/integral-shopping'
import GoodsDetail from '../pages/integral-shopping/goodsDetail'
import GoodsOrder from '../pages/integral-shopping/goodsOrder'
import GoodsOrderSuccess from '../pages/integral-shopping/goodsOrderSuccess'

import SwiperDetail from '../pages/first-page/swipeDetail'
import VolunteerShow from '../pages/first-page/volunteerShow'
import VolunteerShowDetail from '../pages/first-page/volunteerShowDetail'
import VolunteerPhone from '../pages/first-page/volunteerPhone'
import MineTask from '../pages/mine-page/mine-task'
import PublicDemo from '../pages/publicdemo'
import ShowApplyDetail from '../pages/apply-user-type/showApplyDetail'
import OrderHistory from '../pages/integral-shopping/goodsHistory'
import UpdateMineNeeds from '../pages/mine-page/mine-needs/updateMineNeeds'

import MinZhengFengCaiPage from '../pages/first-page/minzhengfengcai'
import BianMinXinXiPage from '../pages/first-page/bianmin'
import EndTask from '../pages/mine-page/mine-task/finishTask'
import ColFinishTask from '../pages/mine-page/mine-task/col-finish-task'

import DemoQuestion from '../pages/question'

import UserSerivce from '../pages/first-page/yinsi/serivce'
import UserYinSi from '../pages/first-page/yinsi/yinsi'

export default [

  {
    path: '/guide',
    name: 'guide',
    component: GuidePage,
    meta: {
      index: 0
    }
  },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: home,
  //
  //   children: [
  //     {
  //       path: '/',
  //       name: 'first',
  //       component: first,
  //       meta: {
  //         index: 2,
  //         // keepAlive: true
  //       }
  //     },
  //
  //     {
  //       path: '/message',
  //       name: 'message',
  //       component: message,
  //       meta: {
  //         index: 2,
  //         // keepAlive: true
  //       }
  //     },
  //     {
  //       path: '/mine',
  //       name: 'mine',
  //       component: mine,
  //       meta: {
  //         index: 2,
  //         // keepAlive: true
  //       }
  //     },
  //   ]
  // },

  {
    path: '/',
    name: 'first',
    component: first,
    meta: {
      title: '首页',
      type: 'guide',
      keepAlive: true,
      showTab: true,
      index: 2,
    }
  },

  {
    path: '/message',
    name: 'message',
    component: message,
    meta: {
      index: 2,
      showTab: true,
      // keepAlive: true
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: mine,
    meta: {
      index: 2,
      showTab: true,
      // keepAlive: true
    }
  },

  {
    path: '/task-detail',
    name: 'task-detail',
    component: TaskDetailPage,
    meta: {
      index: 4
    }
  },
  {
    path: '/swiper-detail',
    name: 'swiper-detail',
    component: SwiperDetail,
    meta: {
      title: '轮播图详情',
      index: 3,
      isback: true
    }
  },
  {
    path: '/bianmin',
    name: 'bianmin',
    component: BianMinXinXiPage,
    meta: {
      title: '便民信息',
      index: 3,
      keepAlive: true
    }
  },
  {
    path: '/minzheng',
    name: 'minzheng',
    component: MinZhengFengCaiPage,
    meta: {
      title: '明证风采',
      index: 3
    }
  },
  {
    path: '/vol-show',
    name: 'vol-show',
    component: VolunteerShow,
    meta: {
      title: '志愿者风采',
      index: 3
    }
  },
  {
    path: '/vol-show-detail',
    name: 'vol-show-detail',
    component: VolunteerShowDetail,
    meta: {
      title: '志愿者风采详情',
      index: 4
    }
  },
  {
    path: '/public-list',
    name: 'public-list',
    component: PublicList,
    meta: {
      title: '公示榜',
      index: 3
    }
  },
  {
    path: '/vol-phone',
    name: 'vol-phone',
    component: VolunteerPhone,
    meta: {
      title: '志愿者热线',
      index: 3
    }
  },
  {
    path: '/integal-shopping',
    name: 'integal-shopping',
    component: IntegalShopping,
    meta: {
      index: 3
    }
  },
  {
    path: '/goods-detail',
    name: 'goods-detail',
    component: GoodsDetail,
    meta: {
      index: 4
    }
  },
  {
    path: '/goods-order',
    name: 'goods-order',
    component: GoodsOrder,
    meta: {
      index: 5
    }
  },
  {
    path: '/goods-order-success',
    name: 'goods-order-success',
    component: GoodsOrderSuccess,
    meta: {
      index: 6
    }
  },
  {
    path: '/goods-history',
    name: 'goods-history',
    component: OrderHistory,
    meta: {
      index: 4
    }
  },
  {
    path: '/login',
    name: 'login',
    component: loginPage,
    meta: {
      title: 'login',
      type: '',
      index: 3
    }
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {
      index: 4
    }
  },
  {
    path: '/forget',
    name: 'forget',
    component: forget,
    meta: {
      index: 4
    }
  },

  {
    path: '/mine-ability',
    name: 'mine-ability',
    component: MineAbility,
    meta: {
      index: 3
    }
  },
  {
    path: '/update-ability',
    name: 'update-ability',
    component: UpdateAbility,
    meta: {
      index: 4
    }
  },
  {
    path: '/mine-needs',
    name: 'mine-needs',
    component: MineNeeds,
    meta: {
      index: 3
    }
  },
  {
    path: '/update-mine-needs',
    name: 'update-mine-needs',
    component: UpdateMineNeeds,
    meta: {
      index: 4
    }
  },
  {
    path: '/mine-score-manager',
    name: 'mine-score-manager',
    component: MineSocreManager,
    meta: {
      index: 3
    }
  },
  {
    path: '/mine-task-manager',
    name: 'mine-task-manager',
    component: MineTask,
    meta: {
      index: 3
    }
  },
  {
    path: '/mine-task-end',
    name: 'mine-task-end',
    component: EndTask,
    meta: {
      index: 4
    }
  },
  {
    path: '/mine-col-task-end',
    name: 'mine-col-task-end',
    component: ColFinishTask,
    meta: {
      index: 4
    }
  },
  {
    path: '/mine-score-list',
    name: 'mine-score-list',
    component: MineScoreList,
    meta: {
      index: 4
    }
  },
  {
    path: '/release-ability',
    name: 'release-ability',
    component: ReleaseAbility,
    meta: {
      index: 3
    }
  },
  {
    path: '/release-ability-success',
    name: 'release-ability-success',
    component: ReleaseAbilitySuccess,
    meta: {
      index: 4
    }
  },
  {
    path: '/release-needs',
    name: 'release-needs',
    component: ReleaseNeeds,
    meta: {
      index: 3
    }
  },
  {
    path: '/release-needs-success',
    name: 'release-needs-success',
    component: ReleaseNeedsSuccess,
    meta: {
      index: 4
    }
  },
  {
    path: '/update-pwd',
    name: 'update-pwd',
    component: UpdatePwd,
    meta: {
      index: 3
    }
  },
  {
    path: '/apply-user-type',
    name: 'apply-user-type',
    component: ApplyUserType,
    meta: {
      index: 4
    }
  },
  {
    path: '/show-apply-detail',
    name: 'show-apply-detail',
    component: ShowApplyDetail,
    meta: {
      index: 5
    }
  },
  {
    path: '/apply-vol-type',
    name: 'apply-vol-type',
    component: ApplyVolType,
    meta: {
      index: 5
    }
  },
  {
    path: '/apply-service-input',
    name: 'apply-service-input',
    component: ApplyServiceInput,
    meta: {
      index: 5
    }
  },
  {
    path: '/apply-sqwork-input',
    name: 'apply-sqwork-input',
    component: ApplySQWorkMan,
    meta: {
      index: 5
    }
  },
  {
    path: '/apply-vol-input',
    name: 'apply-vol-input',
    component: VolInput,
    meta: {
      index: 6
    }
  },
  {
    path: '/apply-vol-org-input',
    name: 'apply-vol-org-input',
    component: ApplyVolOrgInput,
    meta: {
      index: 6
    }
  },
  {
    path: '/apply-submit-success',
    name: 'apply-submit-success',
    component: ApplySubmitSuccess,
    meta: {
      index: 7
    }
  },
  {
    path: '/demo',
    name: 'demo',
    component: PublicDemo,
    meta: {
      index: 10
    }
  },

  {
    path: '/question',
    name: 'question',
    component: DemoQuestion
  },

  {
    path: '/serivce',
    name: 'serivce',
    component: UserSerivce,
    meta: {
      index: 2
    }
  },
  {
    path: '/yinsi',
    name: 'yinsi',
    component: UserYinSi,
    meta: {
      index: 2
    }
  },
]
