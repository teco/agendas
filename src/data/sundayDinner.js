import { client } from '#client-config'

// A client's hosted arrangements must also govern route guidance and maps.
// Keep the shared records intact for clients attending Sunday dinner.
export function createSundayDinnerPolicy(clientConfig) {
  const enabled = clientConfig.sundayDinner !== false
  const isDinner = reference => reference.kind === 'sharedPlan' && reference.id === 'sunday-dinner'
  return {
    enabled,
    introduction: enabled
      ? 'There’s time to enjoy the city before the conference begins. Spend Sunday out exploring or at the ballpark, and join us for dinner at EPIC Steak that evening.'
      : 'There’s time to enjoy the city before the conference begins. Spend Sunday out exploring or at the ballpark, and enjoy the evening at your own pace.',
    sharedPlans: plans => enabled ? plans : plans.filter(plan => plan.id !== 'sunday-dinner'),
    dayPlans: plans => enabled ? plans : plans.map(plan => ({
      ...plan,
      ...Object.fromEntries(['primary', 'secondary', 'evening', 'notices'].map(key => [key, plan[key].filter(ref => !isDinner(ref))])),
    })),
    routes: routes => enabled ? routes : routes.map(route => {
      if (!['sunday-classic', 'sunday-both'].includes(route.id)) return route
      return {
        ...route,
        durationLabel: route.id === 'sunday-classic'
          ? 'Allow about 7½–8½ hours to the bridge viewpoint, including lunch and transfers. Return travel is extra.'
          : 'Allow about 5–5½ hours through the approach to stadium entry; the game is extra.',
        runningLateGuidance: route.runningLateGuidance.replace(' Keep the 7 p.m. EPIC dinner in mind.', ''),
        milestones: route.milestones.filter(item => item.label !== 'Dinner at EPIC Steak').map(item => item.label === 'Return toward downtown'
          ? { ...item, guidance: 'Use a taxi/rideshare from the Welcome Center. Budget roughly 45–60 minutes including pickup and traffic.' }
          : item),
        related: route.related.filter(ref => !isDinner(ref)),
      }
    }),
    routeMaps: maps => enabled ? maps : {
      ...maps,
      anchors: Object.fromEntries(Object.entries(maps.anchors).filter(([key]) => key !== 'epic')),
      legs: maps.legs.filter(leg => leg.origin !== 'epic' && leg.destination !== 'epic'),
    },
  }
}

export const sundayDinnerPolicy = createSundayDinnerPolicy(client)
