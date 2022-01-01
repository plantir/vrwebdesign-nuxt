import './middleware'
import Vue from 'vue'
import {
  defaultLocale,
  defaultLocaleRouteNameSuffix,
  LOCALE_CODE_KEY,
  LOCALE_DOMAIN_KEY,
  MODULE_NAME,
  routesNameSeparator,
  STRATEGIES,
  strategy,
  vuex
} from './options'

function localePath (route, locale) {
  // Abort if no route or no locale
  if (!route) {
    return
  }

  const { i18n } = this

  if (strategy === STRATEGIES.NO_PREFIX && locale && locale !== i18n.locale) {
    // eslint-disable-next-line no-console
    console.warn(`[${MODULE_NAME}] Passing non-current locale to localePath is unsupported when using no_prefix strategy`)
  }

  locale = locale || i18n.locale

  if (!locale) {
    return
  }

  // If route parameter is a string, check if it's a path or name of route.
  if (typeof route === 'string') {
    if (route[0] === '/') {
      // If route parameter is a path, create route object with path.
      route = { path: route }
    } else {
      // Else use it as route name.
      route = { name: route }
    }
  }

  const localizedRoute = Object.assign({}, route)

  if (route.path && !route.name) {
    // if route has a path defined but no name, resolve full route using the path
    const isPrefixed = (
      // don't prefix default locale
      !(locale === defaultLocale && strategy === STRATEGIES.PREFIX_EXCEPT_DEFAULT) &&
        // no prefix for any language
        !(strategy === STRATEGIES.NO_PREFIX) &&
        // no prefix for different domains
        !i18n.differentDomains
    )

    const path = (isPrefixed ? `/${locale}${route.path}` : route.path)

    localizedRoute.path = path
  } else {
    // otherwise resolve route via the route name
    // Build localized route options
    let name = route.name + (strategy === STRATEGIES.NO_PREFIX ? '' : routesNameSeparator + locale)

    // Match route without prefix for default locale
    if (locale === defaultLocale && strategy === STRATEGIES.PREFIX_AND_DEFAULT) {
      name += routesNameSeparator + defaultLocaleRouteNameSuffix
    }

    localizedRoute.name = name

    const { params } = localizedRoute
    if (params && params['0'] === undefined && params.pathMatch) {
      params['0'] = params.pathMatch
    }
  }

  // Resolve localized route
  const { route: { fullPath } } = this.router.resolve(localizedRoute)
  return fullPath
}

function switchLocalePath (locale) {
  const i18n = this.i18n

  if (strategy === STRATEGIES.NO_PREFIX && locale && locale !== i18n.locale) {
    // eslint-disable-next-line no-console
    console.warn(`[${MODULE_NAME}] Passing non-current locale to switchLocalePath is unsupported when using no_prefix strategy`)
  }

  const name = this.getRouteBaseName()
  if (!name) {
    return ''
  }

  const { route, store } = this
  const { params, ...routeCopy } = route
  let langSwitchParams = {}
  if (vuex && vuex.syncRouteParams && store) {
    langSwitchParams = store.getters[`${vuex.moduleName}/localeRouteParams`](locale)
  }
  const baseRoute = Object.assign({}, routeCopy, {
    name,
    params: {
      ...params,
      ...langSwitchParams,
      0: params.pathMatch
    }
  })
  let path = this.localePath(baseRoute, locale)

  // Handle different domains
  if (i18n.differentDomains) {
    const lang = i18n.locales.find(l => l[LOCALE_CODE_KEY] === locale)
    if (lang && lang[LOCALE_DOMAIN_KEY]) {
      let protocol
      if (process.server) {
        const isHTTPS = require('is-https')
        protocol = isHTTPS(this.req) ? 'https' : 'http'
      } else {
        protocol = window.location.protocol.split(':')[0]
      }
      path = protocol + '://' + lang[LOCALE_DOMAIN_KEY] + path
    } else {
      // eslint-disable-next-line no-console
      console.warn(`[${MODULE_NAME}] Could not find domain name for locale ${locale}`)
    }
  }
  return path
}

function getRouteBaseName (givenRoute) {
  const route = givenRoute || this.route
  if (!route.name) {
    return null
  }
  return route.name.split(routesNameSeparator)[0]
}

const VueInstanceProxy = function (targetFunction) {
  return function () {
    const proxy = {
      getRouteBaseName: this.getRouteBaseName,
      i18n: this.$i18n,
      localePath: this.localePath,
      req: process.server ? this.$ssrContext.req : null,
      route: this.$route,
      router: this.$router,
      store: this.$store
    }

    return targetFunction.apply(proxy, arguments)
  }
}

const NuxtContextProxy = function (context, targetFunction) {
  return function () {
    const { app, req, route, store } = context

    const proxy = {
      getRouteBaseName: app.getRouteBaseName,
      i18n: app.i18n,
      localePath: app.localePath,
      req: process.server ? req : null,
      route,
      router: app.router,
      store
    }

    return targetFunction.apply(proxy, arguments)
  }
}

const plugin = {
  install (Vue) {
    Vue.mixin({
      methods: {
        localePath: VueInstanceProxy(localePath),
        switchLocalePath: VueInstanceProxy(switchLocalePath),
        getRouteBaseName: VueInstanceProxy(getRouteBaseName)
      }
    })
  }
}

export default (context) => {
  Vue.use(plugin)
  const { app } = context
  app.localePath = NuxtContextProxy(context, localePath)
  app.switchLocalePath = NuxtContextProxy(context, switchLocalePath)
  app.getRouteBaseName = NuxtContextProxy(context, getRouteBaseName)
}
