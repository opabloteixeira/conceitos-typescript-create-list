import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

// DTO - Data Transfer Object
// Rota, Receber requisição, chamar outro arquivo, devolver uma resposta
// SoC

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();



appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentRepository.all();

  return response.json(appointments);
})



appointmentsRouter.post('/', (request, response) => {
  try {

    const { provider, date } = request.body;

    const parseDate = parseISO(date);

    const createAppointment = new CreateAppointmentService( appointmentRepository);

    const appointment = createAppointment.execute({date: parseDate, provider})

    return response.json(appointment);

  } catch (err) {
    return response.status(400).json({ error: err.message})
  }

});


export default appointmentsRouter;
