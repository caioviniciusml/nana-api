import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod'
import { env } from './env.ts'
import { getCrib } from './routes/get-crib.ts'
import { getSensors } from './routes/get-sensors.ts'
import { getTemperatures } from './routes/get-temperatures.ts'
import { getMovement } from './routes/get-movement.ts'
import { getNoises } from './routes/get-noises.ts'
import { getNotifications } from './routes/get-notifications.ts'
import { getSettings } from './routes/get-settings.ts'
import { createCrib } from './routes/create-crib.ts'
import { renameCrib } from './routes/rename-crib.ts'
import { sendData } from './routes/send-data.ts'
import { sendFanData } from './routes/send-fan-data.ts'
import { updateSettings } from './routes/update-settings.ts'
import { setupSettings } from './routes/setup-settings.ts'
import { createServoNotification } from './routes/create-servo-notification.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: 'http://localhost:3000'
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.listen({ port: env.PORT, host: '0.0.0.0' })

app.get('/health', () => 'OK')
app.register(getCrib)
app.register(getSensors)
app.register(getTemperatures)
app.register(getNoises)
app.register(getMovement)
app.register(getSettings)
app.register(getNotifications)
app.register(createCrib)
app.register(renameCrib)
app.register(sendData)
app.register(sendFanData)
app.register(updateSettings)
app.register(setupSettings)
app.register(createServoNotification)
