   M S B A M L   `   `   `  ����  Budget Tracker     Budget_Tracker.LoginWindow   5   	   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	     � Title$  Login��5   	   $	��600��6   $	��800��6$   .��5      � 
���   �.+�5   
   �� ���#4CAF50$��40��6&   $	��Top=�62    �� CornerRadius$ 5��6J   ._�5      �  � ColumnDefinitions 5	      �� 5
      $��* �6'   �� 5      $
��Auto �6'   �� 5      $
��Auto �6'   �� 5      $
��Auto �6'   .+�5      �� $��Budget Tracker��6   $��24(�62   $
��Bold"�6@   
�������$��Center=�6e   $
��Left=�6�   $��0��6�   $��10,0,0,0q�6�   �� 5      -   5        $��	Dashboard��5      ���#4CAF50
�������$��16(�6U   $��1��6}   $��	10,0,10,0q�6�   $��Right=�6�   �� 5      -   5        $��Transaction��5      ���#4CAF50
�������$��16(�6W   $��2��6   $��	10,0,10,0q�6�   $��Right=�6�   �� 5      -   5        $��Setting��5      ���#4CAF50
�������$��16(�6S   $��3��6{   $��	10,0,10,0q�6�   $��Right=�6�   5      5      �� 5   
   
�������$��2q�6%   $ 10��69    �� Padding$ 20q�6K   $��Center=�6X   $��Center=�6u   $	��352��6�   $	��294��6�    J� Effect 5      3  -System.Windows.Media.Effects.DropShadowEffect  5         Color$ Green��6#      
BlurRadius$ 10Q�61      ShadowDepth$ 5Q�6A      	Direction$	 320Q�6Q   	   Opacity$		 0.5Q�6a   ._�5!      � $��Center=�6   $��Center=�60   $	��250��6K   $	��305��6W   
 � RowDefinitions
 5"      �� 5#      $
��Auto �6$   �� 5%      $��20 �6$   �� 5'      $
��Auto �6$   �� 5)      $
��Auto �6$   �� 5+      $��20 �6$   �� 5-      $
��Auto �6$   �� 5/      $
��Auto �6$   �� 51      $��20 �6$   �� 53      $
��Auto �6$   .+�58      �� $��Login��6   
�������$��24(�6<   $
��Bold"�6J   $��Center=�6\   $��	0,20,0,10q�6y   $��0��6�   �� 5;      $��Email:��6   
�������$��16(�6=   $
��Left=�6K   $��2��6f   $��0,5,0,5q�6s   �� 5<      -   5        $��EmailTextBox��5<      $	��200��6.   $��30��6:   $��Center=�6F   $��2��6c   $��	0,31,0,10q�6p   $��2��6�   �� 5?      $��	Password:��6   
�������$��16(�6@   $
��Left=�6N   $��4��6i   $��	0,10,0,56q�6v   G� 5@      -   5        $��PasswordBox��5@      $	��200��61   $��30��6=   $��Center=�6I   $��4��6f   $��	0,36,0,25q�6s   $��3��6�   �� 5C      -   5        $��Login��5C      $	��120��6)   $��40��65   $��Center=�6A   $��4��6^   ���#4caf50
�������$��16(�6�   $��	0,71,0,29q�6�   $��5��6�   �� 5F      -   5        $��MessageTextBlock��5F      $��14(�64   
���  ��$��Center=�6S   $��9��6p   $��0,10,0,0q�6}   5G      5H      5I      5J      