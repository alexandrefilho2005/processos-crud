import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import {Router, RouterModule} from '@angular/router';
import { ProcessService } from '../process.service';
import { Process } from '../process.model';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ProcessListComponent implements OnInit {
  processes: Process[] = [];
  page: number = 0;
  size: number = 10;
  totalElements: number = 0;
  pages: number[] = [];

  constructor(private processService: ProcessService, private router: Router) {}

  ngOnInit(): void {
    this.loadProcesses();
  }

  loadProcesses(): void {
    this.processService.getProcesses(this.page, this.size).subscribe(data => {
      this.processes = data.content;
      this.totalElements = data.totalElements;
      this.pages = Array.from({length: Math.ceil(this.totalElements / this.size)}, (_, i) => i);
    });
  }

  viewProcess(id: number): void {
    this.router.navigate(['/process', id]);  // Navegue para a página de detalhes do processo
  }

  deleteProcess(id: number): void {
    if (confirm('Tem certeza que deseja deletar este processo?')) {
      this.processService.deleteProcess(id).subscribe(() => {
        this.loadProcesses();  // Recarrega a lista de processos após a exclusão
      });
    }
  }

  setPage(page: number): void {
    if (page >= 0 && page < this.pages.length) {
      this.page = page;
      this.loadProcesses();
    }
  }
}
