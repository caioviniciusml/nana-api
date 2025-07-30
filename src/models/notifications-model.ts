import { prisma } from '../db/connection.ts'

interface NanaData {
  cribId: string
  tempSensorStatus: boolean
  movSensorStatus: boolean
  noiseSensorStatus: boolean
  temperature: number
  movement: boolean
  noise: number
}

export function handleNotifications({
  cribId,
  tempSensorStatus,
  movSensorStatus,
  noiseSensorStatus,
  temperature,
  movement,
  noise
}: NanaData) {
  handleSensorsNotifications(cribId, tempSensorStatus, movSensorStatus, noiseSensorStatus)
  handleTemperatureNotification(cribId, tempSensorStatus, temperature)
  handleMovementNotification(cribId, movSensorStatus, movement)
  handleNoiseNotification(cribId, noiseSensorStatus, noise)
}

export async function handleSensorsNotifications(
  cribId: string,
  tempSensorStatus: boolean,
  movSensorStatus: boolean,
  noiseSensorStatus: boolean
) {
  try {
    const lastSensorsStatus = await prisma.sensors.findFirst({
      where: { cribId },
      orderBy: { id: 'desc' },
      skip: 1
    })

    if (lastSensorsStatus?.tempSensorStatus !== tempSensorStatus) {
      const type = tempSensorStatus ? 'sensor working' : 'sensor not working'
      const extra = 'temperature'

      await prisma.notifications.create({
        data: {
          cribId,
          type,
          extra
        }
      })
    }

    if (lastSensorsStatus?.movSensorStatus !== movSensorStatus) {
      const type = movSensorStatus ? 'sensor working' : 'sensor not working'
      const extra = 'movement'

      await prisma.notifications.create({
        data: {
          cribId,
          type,
          extra
        }
      })
    }

    if (lastSensorsStatus?.noiseSensorStatus !== noiseSensorStatus) {
      const type = noiseSensorStatus ? 'sensor working' : 'sensor not working'
      const extra = 'noise'

      await prisma.notifications.create({
        data: {
          cribId,
          type,
          extra
        }
      })
    }
  } catch (err) {
    return console.error(err)
  }
}

export async function handleTemperatureNotification(
  cribId: string,
  tempSensorStatus: boolean,
  temperature: number
) {
  if (!tempSensorStatus) return

  try {
    const lastSettings = await prisma.settings.findFirstOrThrow({
      where: { cribId },
      orderBy: { id: 'desc' }
    })

    let extra;

    if (temperature <= lastSettings?.coldThreshold) {
      extra = 'cold'
    } else if (temperature <= lastSettings?.warmThreshold) {
      extra = 'moderate'
    } else {
      extra = 'warm'
    }

    const lastTemperatureNotification = await prisma.notifications.findFirst({
      where: { cribId, type: "temperature" },
      select: { extra: true },
      orderBy: { id: 'desc' }
    })

    if (extra !== lastTemperatureNotification?.extra) {
      await prisma.notifications.create({
        data: {
          cribId,
          type: "temperature",
          extra
        }
      })
    }
  } catch (err) {
    return console.error(err)
  }
}

export async function handleMovementNotification(
  cribId: string,
  movSensorStatus: boolean,
  movement: boolean
) {
  if (!movSensorStatus) return

  try {
    if (movement) {
      await prisma.notifications.create({
        data: {
          cribId,
          type: "movement",
          extra: "detected"
        }
      })
    }
  } catch (err) {
    return console.error(err)
  }
}

export async function handleNoiseNotification(
  cribId: string,
  noiseSensorStatus: boolean,
  noise: number
) {
  if (!noiseSensorStatus) return

  try {
    let extra;

    if (noise <= 1600) {
      extra = 'quiet'
    } else if (noise <= 1800) {
      extra = 'moderate'
    } else {
      extra = 'loud'
    }

    const lastNoiseNotification = await prisma.notifications.findFirst({
      where: { cribId, type: "noise" },
      select: { extra: true },
      orderBy: { id: 'desc' }
    })

    if (extra !== lastNoiseNotification?.extra) {
      await prisma.notifications.create({
        data: {
          cribId,
          type: "noise",
          extra
        }
      })
    }
  } catch (err) {
    return console.error(err)
  }
}
