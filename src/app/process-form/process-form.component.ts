import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProcessService } from '../process.service';
import { IbgeService } from '../ibge.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Process } from '../process.model';

@Component({
  selector: 'app-process-form',
  templateUrl: './process-form.component.html',
  styleUrls: ['./process-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ProcessFormComponent implements OnInit {
  processForm: FormGroup;
  ufs: any[] = [];
  municipios: any[] = [];
  selectedFile: File | null = null;
  isEditMode: boolean = false;
  processId: number | null = null;
  currentDocumentUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private processService: ProcessService,
    private ibgeService: IbgeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.processForm = this.fb.group({
      npu: ['', [Validators.required, Validators.pattern(/^\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4}$/)]],
      dataCadastro: ['', Validators.required],
      municipio: ['', Validators.required],
      uf: ['', Validators.required],
      documento: ['']
    });
  }

  ngOnInit(): void {
    this.ibgeService.getUFs().subscribe(data => {
      this.ufs = data;
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.processId = +id;
        this.loadProcess(+id);
      } else {
        // Se for um novo processo, o campo documento é obrigatório
        this.processForm.get('documento')?.setValidators([Validators.required]);
      }
    });
  }

  loadProcess(id: number): void {
    this.processService.getProcess(id).subscribe(data => {
      this.processForm.patchValue({
        npu: data.npu,
        dataCadastro: data.dataCadastro,
        municipio: data.municipio,
        uf: data.uf
      });

      // Carregar os municípios da UF selecionada
      this.ibgeService.getMunicipios(data.uf).subscribe(municipios => {
        this.municipios = municipios;
      });

      // Definir a URL do documento atual
      this.currentDocumentUrl = `${this.processService.apiUrl}/${id}/documento`;
    });
  }

  onUFChange(): void {
    const uf = this.processForm.get('uf')?.value;
    if (uf) {
      this.ibgeService.getMunicipios(uf).subscribe(data => {
        this.municipios = data;
      });
    }
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.processForm.get('documento')?.setValue(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.processForm.valid) {
      const formData = new FormData();
      formData.append('npu', this.processForm.get('npu')?.value);
      formData.append('dataCadastro', this.processForm.get('dataCadastro')?.value);
      formData.append('municipio', this.processForm.get('municipio')?.value);
      formData.append('uf', this.processForm.get('uf')?.value);

      if(this.selectedFile){
        formData.append('documento', this.selectedFile);
      }

      if(this.isEditMode && this.processId){
        this.processService.updateProcess(this.processId, formData).subscribe(() => {
          this.router.navigate(['/processos']);
        });
      } else {
        this.processService.createProcess(formData).subscribe(() => {
          this.router.navigate(['/processos']);
        });
      }
    }
  }

  updateProcess(id: number): void {
    if (this.processForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('npu', this.processForm.get('npu')?.value);
      formData.append('dataCadastro', this.processForm.get('dataCadastro')?.value);
      formData.append('municipio', this.processForm.get('municipio')?.value);
      formData.append('uf', this.processForm.get('uf')?.value);
      formData.append('documento', this.selectedFile);

      this.processService.updateProcess(id, formData).subscribe(() => {
        this.router.navigate(['/processos']);
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/processos']);
  }
}
