import { useMemo } from 'react'
import { DEFAULT_FILTER_OPTION_SET } from '@/constants/teacherFilters'
import { useTranslation } from './LanguageProvider.jsx'

/** Map string option arrays to { value, label } with Khmer labels when lang=km */
export function localizeOptionList(options, labelFor) {
  return options.map((value) => ({
    value,
    label: labelFor(value),
  }))
}

export function localizeOptionSet(optionSet, labelFor) {
  return {
    majors: localizeOptionList(optionSet.majors ?? [], labelFor),
    subjects: localizeOptionList(optionSet.subjects ?? [], labelFor),
    locations: localizeOptionList(optionSet.locations ?? [], labelFor),
    sorts: localizeOptionList(optionSet.sorts ?? [], labelFor),
    types: localizeOptionList(optionSet.types ?? [], labelFor),
    times: localizeOptionList(optionSet.times ?? [], labelFor),
  }
}

export function useLocalizedFilterOptions(optionSet = DEFAULT_FILTER_OPTION_SET) {
  const { labelFor } = useTranslation()
  return useMemo(() => localizeOptionSet(optionSet, labelFor), [optionSet, labelFor])
}
