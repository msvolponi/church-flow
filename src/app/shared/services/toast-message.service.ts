import { Injectable } from '@angular/core';
import { MessageService, ToastMessageOptions } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {
  constructor(private service: MessageService) { }

  success(message: string, summary: string, config?: ToastMessageOptions): void {
    config = this.defaultConfig(config);
    config.severity = 'success';

    this.show(message, summary, config);
  }

  info(message: string, summary: string, config?: ToastMessageOptions): void {
    config = this.defaultConfig(config);
    config.severity = 'info';

    this.show(message, summary, config);
  }

  error(message: string, summary: string, config?: ToastMessageOptions): void {
    config = this.defaultConfig(config);
    config.severity = 'error';
    this.show(message, summary, config);
  }

  warn(message: string, summary: string, config?: ToastMessageOptions): void {
    config = this.defaultConfig(config);
    config.severity = 'warn';
    this.show(message, summary, config);
  }

  public show(message: string, summary: string, config: ToastMessageOptions) {
    config.detail = message;
    config.summary = summary;
    this.service.add(config);
  }

  private defaultConfig(config: ToastMessageOptions | undefined) {
    config = config || {
      life: 3000
    };

    return config;
  }
}
