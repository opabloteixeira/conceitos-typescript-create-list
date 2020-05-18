import Appointment from '../models/Appointment';
import appointmentRepository from '../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';
/*Dependency Inversion um conceito do (SOLID)*/

interface RequestDTO {
  date: Date,
  provider: string
}

class CreateAppointmentServices {
  private appointmentRepository: appointmentRepository;

  constructor(appointmentRepository: appointmentRepository){
    this.appointmentRepository = appointmentRepository;
  }

  public execute({date, provider}: RequestDTO ): Appointment{

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentRepository.findByDate(appointmentDate);

    if(findAppointmentInSameDate){
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentRepository.create({date: appointmentDate, provider});

    return appointment;
  }
}

export default CreateAppointmentServices;
