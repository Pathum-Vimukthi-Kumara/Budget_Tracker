   M S B A M L   `   `   `  ����U  QLiveCharts.Wpf, Version=0.9.7.0, Culture=neutral, PublicKeyToken=0bc1f845d1ebb8dfG4clr-namespace:LiveCharts.Wpf;assembly=LiveCharts.WpfLiveCharts.Wpf  5   	    Budget Tracker    Budget_Tracker.GraphWindow   5   	   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   Dlvc4clr-namespace:LiveCharts.Wpf;assembly=LiveCharts.Wpf     5   	     � Title$  Transaction Graph��5   	   $	��450��6#   $	��700��60    � WindowStartupLocation$ CenterScreen=�5   	   ��5      �� 5	   
    �� 
StartPoint$	 0,0&�6    �� EndPoint$	 0,1&�6/   .��5
      �  � Color$ DarkBlue��6    � Offset$	 0.0Q�6,   � 5      $ 	AliceBlue��6   $	 1.0Q�6-   5      .��5      � .+�5   
   �� $��10q�6   .+�5      �� $��Transaction Summary��6   $��16(�5      $
��Bold"�5      $��Center=�5      
�������$��0,0,0,10q�5      #   LiveCharts.Wpf.CartesianChart  5      $	��300��6E   
���   �&    LiveCharts.Wpf.Charts.Base.Chart   Series 6!   �� *SeriesCollection+   AxisX 5         LiveCharts.Wpf.Axis     Title$ Category��6   	   
Foreground
	 �   �
   Labels
 60   �� *Labels+6J      AxisY 5        $ Amount (Rs)��6   
	 �����63   5!      5"      5#      5$      