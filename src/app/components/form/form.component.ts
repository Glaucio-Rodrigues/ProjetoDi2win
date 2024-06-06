import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

const FRUITS: string[] = [
  '1800',
  '3000',
  '2400',
  '2400',
  '455',
  '1800',
  '2000',
  '2200',
];
const NAMES: string[] = [
  '22/05/2024',
  '13/05/2023',
  '21/08/2024',
  '01/06/2024',
  '21/07/2024',
  '11/09/2024',
  '03/06/2024',
  '04/04/2024',
  '21/05/2024',
  '17/05/2024',
  '21/05/2024',
  '13/11/2023',
  '01/11/2024',
  '21/05/2024',
  '12/05/2024',
  '01/04/2024',
  '13/01/2024',
  '21/05/2024',
  '21/05/2024',
];

@Component({
  selector: 'app-form',
  styleUrls: ['form.component.scss'],
  templateUrl: 'form.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()]
})
export class FormComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  baixarRelatorio() {
    // Implementar a lógica para baixar o relatório
    console.log('Baixando relatório...');
  }
}

function createNewUser(id: number): UserData {
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const fruit = FRUITS[Math.floor(Math.random() * FRUITS.length)];
  const cpfOrCnpj = generateCpfOrCnpj();

  return {
    id: cpfOrCnpj,
    name: name,
    progress: 'Sintético', // Define explicitamente o valor 'Sintético' para a coluna progress
    fruit: fruit,
  };
}

function generateCpfOrCnpj(): string {
  const isCpf = Math.random() > 0.5;
  const numDigits = isCpf ? 11 : 14;
  const randomDigits = Array.from({ length: numDigits }, () => Math.floor(Math.random() * 10)).join('');
  return formatCpfOrCnpj(randomDigits, isCpf);
}

function formatCpfOrCnpj(digits: string, isCpf: boolean): string {
  if (isCpf) {
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else {
    return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
}
