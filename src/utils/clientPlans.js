// Scope changes to the selected client's day references; shared source records stay intact.
export function applyClientDayPlans(plans, client) {
  const tourDates = new Set((client.innovationTour ?? []).map(event => event.date));
  return plans.map(plan => ({
    ...plan,
    ...Object.fromEntries(['primary', 'secondary', 'evening', 'notices'].map(key => [key,
      plan[key].filter(ref => !(tourDates.has(plan.date) && ref.kind === 'guide' && ref.id === 'monday') &&
        !(ref.kind === 'sharedPlan' && client.sharedPlanEventAliases?.[ref.id]))
    ])),
  }));
}
