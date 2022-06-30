import { FormControl } from "@angular/forms"

export class RepeadPassword{
    static passwordReview(value: any) {
        
        return (control: FormControl): object | null => {
      
          if (control.value && (control.value !== value)) {
            return {
              passwordReview: true
            }
          }
          return null
        }
      }
      
      
}