   M S B A M L   `   `   `  ����  Budget Tracker$    Budget_Tracker.DashboardWindow   5   	   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	     � Title$  	Dashboard��5   	   $	��800��6   $
��1200��6(   .��5      � .+�5   
   �� 
���   � �� Padding$ 20q�6$   $	��300��61   $
��Left=�6=   $��Stretch=�6X   ._�5      �� .+�5	      �� $��Expenso��6   
�������$��28(�6>   $
��Bold"�6L   $��	0,10,0,30q�6^   �� 5      
���  �� �� CornerRadius$ 10��6*   $��	0,10,0,10q�6<   ._�5      �� $��10q�6!   .+�5      �� $��Expenses��6$   
�������$��20(�6G   $
��Bold"�6U   �� 5      $��Rs. 8075��6$   
�������$��28(�6G   $
��Bold"�6U   5      5      5      5      � 5   
   $��320,20,20,20q�6    � RowDefinitions 5      �� 5      $	��200 �6    �� 5      $��* �6    .+�5      &   System.Windows.Controls.DataGrid  $��0��6      AutoGenerateColumns$ False��6I   $��10q�6e   ��6$   �� *Transactions+   Columns 5      0  *System.Windows.Controls.DataGridTextColumn  5      ,  &System.Windows.Controls.DataGridColumn   Header$
 Date��6)      Width5  /System.Windows.Controls.DataGridLengthConverter$	 200 6P   1  +System.Windows.Controls.DataGridBoundColumn   Binding 67   �� *Date+6P     5       $ Category��6)   $	 200 6X    6;   �� *
Category+6X     5!      $
 Type��6)   $	 100 6P    67   �� *Type+6P     5"      $ Amount��6)   $	 100 6T    69   �� *Amount+6T   4  .System.Windows.Controls.DataGridTemplateColumn  5#      $ Actions��6-   $	 100 6>   	   CellTemplate	 5$      �� 5%      .R�5&   "   �� -   5        $��Remove��5&   )   6:   5'      5)      5+      �� 5.      $��1��6   $��10q�6&   .+�50      �� -   5        $��DateTextBox��50      $��Date (YYYY-MM-DD)��6-   $��5q�6F   
�������51   f   �� 54      -   5        $��CategoryTextBox��54      $��Category��61   $��5q�6A   
�������55   H   �� 58      -   5        $��AmountTextBox��58      $��Amount��6/   $��5q�6=   
�������59   H   �� 5<      -   5        $��Add Transaction��5<      $��5q�6P   5=      5>      5?      5@      