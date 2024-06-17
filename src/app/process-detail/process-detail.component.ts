import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ProcessService } from '../process.service';
import { Process } from '../process.model';

@Component({
  selector: 'app-process-detail',
  templateUrl: './process-detail.component.html',
  styleUrls: ['./process-detail.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ProcessDetailComponent implements OnInit {
  process: Process | undefined;

  constructor(private route: ActivatedRoute, private processService: ProcessService, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.processService.getProcess(Number(id)).subscribe(data => {
        if (data.dataCadastro) {
          data.dataCadastro = new Date(data.dataCadastro);
        }
        this.process = data;
        this.markAsViewed();
      });
    }
  }

  getProcess(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.processService.getProcess(id).subscribe(data => {
      this.process = data;
      this.markAsViewed();
    });
  }

  markAsViewed(): void {
    if (this.process) {
      const formData = new FormData();
      formData.append('npu', this.process.npu);
      const dataCadastro = new Date(this.process.dataCadastro);
      formData.append('dataCadastro', dataCadastro.toISOString().split('T')[0]);
      formData.append('municipio', this.process.municipio);
      formData.append('uf', this.process.uf);

      // Verifique se o documento está presente antes de adicioná-lo ao formData
      if (this.process.documento) {
        formData.append('documento', this.process.documento);
      }

      this.processService.updateProcess(this.process.id, formData).subscribe({
        next: () => {
          console.log('Process updated successfully');
        },
        error: (err) => {
          console.error('Error updating process:', err);
        }
      });
    }
  }

  downloadDocumento(): void {
    if (this.process) {
      const url = `http://localhost:8080/api/processos/${this.process.id}/documento`;
      window.open(url, '_blank');
    }
  }

  goBack(): void {
    this.router.navigate(['/processos']);
  }
}
