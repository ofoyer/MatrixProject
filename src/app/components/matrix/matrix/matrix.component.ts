import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router"
import { of } from 'rxjs';

const BLACK_COLOR_IN_HEX = '#000000';
const CELL_WIDTH         = 20;
const BLACK              = 'black';
const WHITE              = 'white';

interface Cell {
  color: string;
}

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})
export class MatrixComponent implements OnInit {
  private draw: boolean;
  private n: number;
  private m: number;
  private cells: Cell[][] = [];

  private traversed: boolean[][] = [];
  private reachedX: number = 0;
  private reachedY: number = 0;
  stackSize: number = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.draw = params.draw === 'true';
      this.n    = parseInt(params.n);
      this.m    = parseInt(params.m);
    });

    this.generateCells().subscribe(obseravleCells => this.cells = obseravleCells);
  }

  private generateCells() {
    var results: Cell[][] = [];

    for (let i = 0; i < this.m; i++) {
      results[i]     = [];
      this.traversed[i] = [];

      for (let j = 0; j < this.n; j++) {
        this.traversed[i].push(false);
        results[i][j] = {
           color: this.draw ? WHITE : Math.random() >= 0.8 ? BLACK : WHITE
         };
      }
    }

    return of(results);
  }

  private solve() {
    const start: any = new Date();

    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        this.dfs(i, j, this.randomColor());
      }
    }

    const end: any = new Date();
    this.notifyOnDfsRunTime(end - start);
  }

  private dfs(m, n, color): void {
    const start: any = new Date();
    if (n === null) return;
    if (this.traversed[m][n]) return;

    this.traversed[m][n] = true;

    if (this.isWhite(m, n)) return;

    this.cells[m][n].color = color;
    if (this.inBoundsAndBlack(m - 1, n - 1)) this.dfs(m - 1, n - 1, color);
    if (this.inBoundsAndBlack(m - 1, n    )) this.dfs(m - 1, n    , color);
    if (this.inBoundsAndBlack(m - 1, n + 1)) this.dfs(m - 1, n + 1, color);
    if (this.inBoundsAndBlack(m    , n - 1)) this.dfs(m    , n - 1, color);
    if (this.inBoundsAndBlack(m    , n + 1)) this.dfs(m    , n + 1, color);
    if (this.inBoundsAndBlack(m + 1, n - 1)) this.dfs(m + 1, n - 1, color);
    if (this.inBoundsAndBlack(m + 1, n    )) this.dfs(m + 1, n    , color);
    if (this.inBoundsAndBlack(m + 1, n + 1)) this.dfs(m + 1, n + 1, color);
    const end: any = new Date();
    this.notifyOnDfsRunTime(end - start);
  }

  private isWhite(i, j): boolean {
    return this.cells[i][j].color === WHITE;
  }

  private inBoundsAndBlack(i, j): boolean {
    if (i < 0 || j < 0) return false;
    if (i >= this.m || j >= this.n) return false;
    return !this.isWhite(i, j);
  }

  private cellsSingleArray() {
    return [].concat(...this.cells);
  }

  private changeColor(cell: Cell): any {
    if (!this.draw || this.traversed[0][0]) return;

    if (cell.color === BLACK) return cell.color = WHITE;
    cell.color = BLACK;
  }

  private toHomeScreen() {
    this.router.navigate(['/home']);
  }

  private matGridListWidth(): string {
    return `${this.n * CELL_WIDTH }px`;
  }

  private notifyOnDfsRunTime(time) {
    this.snackBar.open(
      `DFS took ${time} miliseconds`,
      'Awesome!',
      { duration: 3000, panelClass: 'success-dialog' }
    );
  }

  private randomColor(): string {
    let color: string = BLACK_COLOR_IN_HEX;

    while (color === BLACK_COLOR_IN_HEX) {
      color = '#'
      for (let i = 0; i < 6; i++) color += (Math.random()*0xF<<0).toString(16);
    }

    return color;
  }

  private indexArrayOfLength(n) {
    const array = [];
    let counter = 0;
    while (counter < n) {
      array.push(counter);
      counter += 1;
    }

    return array;
  }

  private cellAt(j, i) {
    console.log('counter')
    return this.cells[i][j];
  }
}
