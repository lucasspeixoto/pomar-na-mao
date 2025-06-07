import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  imports: [DialogModule],
  template: `<p-dialog [visible]="isVisible" />`,
})
class TestHostComponent {
  isVisible = false;
}

describe('ComplementFormDialog', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    component.isVisible = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
