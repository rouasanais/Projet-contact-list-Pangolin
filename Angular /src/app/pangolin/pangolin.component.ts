import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { UserService } from '../shared/user.service';
import { PangolinService } from '../shared/pangolin.service';
import { Pangolin } from '../shared/pangolin.model';




declare var M: any;

@Component({
  selector: 'app-pangolin',
  templateUrl: './pangolin.component.html',
  styleUrls: ['./pangolin.component.css'],
  providers: [PangolinService]
})
export class PangolinComponent implements OnInit {
  userDetails;
  
  familles: String[] =  [
        'Pangolin malais', 
        'Pangolin de Chine', 
        'Pangolin indien', 
        'Pangolin des Philippines',
        'Pangolin géant', 
        'Pangolin du Cap',
        'Pangolin à longue queue', 
        'Pangolin à petites écailles',
    
    ];

  races: String[] = [
    'Manis',
    'Paramanis',
    'Phataginus',
    'Smutsia',
    'Uromanis',
  ];

  constructor(public pangolinService: PangolinService,private userService: UserService, private router: Router) {}
 
  ngOnInit() {
    this.resetForm();
    this.refreshPangolinList();
  }


  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.pangolinService.selectedPangolin = {
      _id: "",
      famille: [""],
      race: [""],
      nourriture: "",
      age: null
    }
   
  }


  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.pangolinService.postPangolin(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshPangolinList();
        M.toast({ html: 'Enregistré avec succès', classes: 'rounded' });
      });
    }
    else {
      this.pangolinService.putPangolin(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshPangolinList();
        M.toast({ html: 'Mis à jour avec succés', classes: 'rounded' });
      });
    }
  }

  refreshPangolinList() {
    this.pangolinService.getPangolinList().subscribe((res) => {
    this.pangolinService.pangolins = res as Pangolin[];

    
      
    });
  }

  onEdit(pan: Pangolin) {
    this.pangolinService.selectedPangolin = pan;
    
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Voulez-vous vraiment supprimer cet enregistrement?') == true) {
      this.pangolinService.deletePangolin(_id).subscribe((res) => {
        this.refreshPangolinList();
        this.resetForm(form);
        M.toast({ html: 'Supprimé avec succès', classes: 'rounded' });
      });
    }
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }



}
