import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod'
import { env } from './env.ts'
import { getCrib } from './routes/get-crib.ts'
import { getSensors } from './routes/get-sensors.ts'
import { getTemperatures } from './routes/get-temperatures.ts'
import { getMovements } from './routes/get-movements.ts'
import { getNoises } from './routes/get-noises.ts'
import { getNotifications } from './routes/get-notifications.ts'
import { getSettings } from './routes/get-settings.ts'
import { createCrib } from './routes/create-crib.ts'
import { sendData } from './routes/send-data.ts'
import { createNotification } from './routes/create-notification.ts'
import { updateSettings } from './routes/update-settings.ts'
import { updateFanSettings } from './routes/update-fan.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: 'http://localhost:3000'
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.listen({ port: env.PORT })

app.get('/health', () => {
  return 'OK'
})

app.register(getCrib)
app.register(getSensors)
app.register(getTemperatures)
app.register(getMovements)
app.register(getNoises)
app.register(getNotifications)
app.register(getSettings)
app.register(createCrib)
app.register(sendData)
app.register(createNotification)
app.register(updateSettings)  
app.register(updateFanSettings)
