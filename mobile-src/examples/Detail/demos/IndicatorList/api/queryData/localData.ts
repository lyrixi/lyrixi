import type { MetricItem, IndicatorListViewData } from '../../Main/types'

function formatRate(complete: unknown, target: unknown): string {
  const completeNum = Number(complete)
  const targetNum = Number(target)
  if (!targetNum || Number.isNaN(completeNum) || Number.isNaN(targetNum)) {
    return '-'
  }
  const rate = ((completeNum / targetNum) * 100).toFixed(2)
  return Number.isNaN(Number(rate)) ? '-' : rate
}

function localMainTarget(serverMain?: Record<string, unknown> | null): MetricItem | null {
  if (!serverMain) return null

  return {
    id: String(serverMain.setting_id || ''),
    title: String(serverMain.setting_name || '--'),
    target: String(serverMain.target ?? '-'),
    complete: String(serverMain.complete ?? '-'),
    rate: formatRate(serverMain.complete, serverMain.target)
  }
}

function localSubTargets(list: unknown): MetricItem[] {
  if (!Array.isArray(list)) return []

  return list.filter(Boolean).map((item: Record<string, unknown>) => ({
    id: String(item.dim_id || item.setting_id || ''),
    title: String(item.dim_name || item.setting_name || '--'),
    target: String(item.target ?? '-'),
    complete: String(item.complete ?? '-'),
    rate: formatRate(item.complete, item.target)
  }))
}

function localData(serverData: Record<string, unknown> = {}): IndicatorListViewData {
  return {
    mainTarget: localMainTarget(serverData.mainTarget as Record<string, unknown> | null),
    subTargets: localSubTargets(serverData.subTargets)
  }
}

export default localData
