# Better-Scroll
better-scroll 是一款重点解决移动端（现已支持 PC 端）各种滚动场景需求的插件。它的核心是借鉴的 iscroll 的实现，它的 API 设计基本兼容 iscroll，在 iscroll 的基础上又扩展了一些特征以及做了一些性能优化。
better-scroll 是基于原生 JS 实现的，不依赖任何框架。	
手册地址：http://ustbhuangyi.github.io/better-scroll/doc/zh-hans/
## 使用说明
new BScroll(wrapper，{
		配置信息
	})

## Better-Scroll制作幻灯片
-配置信息
    - scrollX
    - scrollY
    - snap：{
        loop:true||false
        threshold:0-1
    }
    - eventPassthrough: vertical|horizontal

- 相关方法:
	- getCurrentPage()
	- next()
	- prev()

- 相关事件:
	- scrollEnd
	- beforeScrollStart
	- touchEnd

## Better-Scroll制作选择器
- 配置信息
	wheel:{
		selectedIndex:0,
		adjustTime:400,
		rotate: 36,
		wheelWrapperClass: 'list',
  		wheelItemClass: 'list-item'
	}

- 相关方法:
	- getSelectedIndex

- 相关事件:
	- scrollEnd

## Better-Scroll制作indexList
- 配置信息
	probeType

- 相关方法:
	- scrollToElement

- 相关事件:
	- scroll

## Better-Scroll制作上滑加载
- 配置信息
    pullUpLoad: {
        threshold: 50
    }
- 相关方法:
	- finishPullUp
            - openPullUp
            - closePullUp
- 相关事件:
	- pullingUp

## Better-Scroll制作下拉刷新
- 配置信息
    pullDownRefresh : {
        threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
        stop: 20 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
    }
- 相关方法:
	- finishPullDown
	- openPullDown
	- closePullDown
- 相关事件:
	- pullingDown

